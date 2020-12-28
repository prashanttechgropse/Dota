const apiService = require("./apiService");

const getAllHeroes = async (id) => {
  const { data, error } = await apiService.get(
    `https://api.opendota.com/api/players/${id}/heroes?is_radiant=1`
  );
  if (data) return { data };
  return error;
};

const getData = async (id) => {
  try {
    const { data, error } = await getAllHeroes(id);
    if (error) throw error;
    const { hero_id: firstHeroId } = await searchFirstHero(data);
    const { hero_id: secondHeroId } = await searchSecondHero(firstHeroId, data);
    const { hero_id: thirdHeroId } = await searchThirdHero(
      firstHeroId,
      secondHeroId,
      data
    );
    console.log("the details of three top hero ids are");
    const heroes = await getDetailsOfHeroes();
    let detailsOfTopThreeHeroes = [];
    await detailsOfTopThreeHeroes.push(
      await extractDetailsOfAHero(firstHeroId, heroes)
    );
    await detailsOfTopThreeHeroes.push(
      await extractDetailsOfAHero(secondHeroId, heroes)
    );
    await detailsOfTopThreeHeroes.push(
      await extractDetailsOfAHero(thirdHeroId, heroes)
    );
    console.log(detailsOfTopThreeHeroes);
  } catch (error) {
    console.log("Error:kindly enter a valid account id");
  }
};

const searchFirstHero = async (data) => {
  let first = { games: 0 };
  await data.map((hero) => {
    if (hero.games > first.games) {
      first = hero;
    }
  });
  return first;
};

const searchSecondHero = async (firstHeroId, data) => {
  let second = { games: 0 };
  await data.map((hero) => {
    if (hero.games > second.games && hero.hero_id !== firstHeroId) {
      second = hero;
    }
  });
  return second;
};

const searchThirdHero = async (firstHeroId, secondHeroId, data) => {
  let third = { games: 0 };
  await data.map((hero) => {
    if (
      hero.games > third.games &&
      hero.hero_id !== firstHeroId &&
      hero.hero_id !== secondHeroId
    ) {
      third = hero;
    }
  });
  return third;
};

const getDetailsOfHeroes = async () => {
  const { data } = await apiService.get(`https://api.opendota.com/api/heroes`);
  return data;
};

const extractDetailsOfAHero = async (id, heroes) => {
  const heroDetails = await heroes.find((hero) => id == hero.id);
  return heroDetails;
};

module.exports = { getData };
