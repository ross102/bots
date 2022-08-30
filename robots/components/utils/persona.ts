import axios from "axios";
import process from "./types";

export default axios.create({
  baseURL: process.env.PERSONA,
  timeout: 40000,
  headers: {
    "content-type": "application/json",
    Authorization: `Bearer ${process.env.TOKEN}`,
  },
});
