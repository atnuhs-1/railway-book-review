import axios from "axios";

const api = axios.create({
  baseURL: "https://railway.bookreview.techtrain.dev",
});

export default api;
