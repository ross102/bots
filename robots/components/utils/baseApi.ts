import axios from "axios";
import process from "./types";

export default axios.create({
  baseURL: process.env.BASE_API,
  timeout: 40000,
  headers: {
    "content-type": "application/json",
  },
});
