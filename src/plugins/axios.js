import axios from "axios";

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
const $http = axios.create({
  baseURL: "https://localhost:7120/api/Product", //url base da sua api
});

export default $http;

