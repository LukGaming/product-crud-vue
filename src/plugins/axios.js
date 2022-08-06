import axios from "axios";

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
const $http = axios.create({
  baseURL: "http://localhost:5120/api/", //url base da sua api
});

export default $http;

