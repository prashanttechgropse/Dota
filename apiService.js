const axios = require("axios");

const httpClient = axios.create();

const errorCallBack = (error) => {
  const expectedError = error.response;
  if (!expectedError) {
    console.log("kindly enter a valid account id");
  }
  return Promise.reject(error);
};

//const setAxios = async (userToken) => {};

//intercept errors while communicating with backend server
httpClient.interceptors.response.use(null, errorCallBack);

const get = async (url) => {
  const data = await httpClient.get(url);
  return data;
};

const post = async (url, formData) => {
  const data = await httpClient.post(url, formData);
  return data;
};

module.exports = {
  get,
  post,
  put: axios.put,
  delete: axios.delete,
};
