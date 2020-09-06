import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-1234-ab292.firebaseio.com/"
});

export default instance;
