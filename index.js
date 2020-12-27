const readline = require("readline");
const { getData } = require("./helperFunctions");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const mainFunction = () => {
  rl.question("kindly enter the account id? ", async (id) => {
    await getData(id);
    mainFunction();
  });
};

mainFunction();

rl.on("close", function () {
  console.log("thanks for using the api");
  process.exit(0);
});
