import axios from "axios";
import { BASE_URL } from "./helper.service";

export const publicAxios = axios.create({
  baseURL: BASE_URL,
});
