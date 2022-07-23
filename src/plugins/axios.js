import axios from "axios";

const $http = axios.create({
  baseURL: "https://localhost:7120/api/", //url base da sua api
});

export default $http;
