import axios from "axios";

export const api = axios.create({
  baseURL: "https://cipa-elections-backend.herokuapp.com/",
});
