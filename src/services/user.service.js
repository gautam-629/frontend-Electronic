// user related api calls
import { publicAxios } from "./axios.service";

//register new user
export const registerUser = (userData) => {
  return publicAxios.post(`/users`, userData).then((response) => response.data);
};

//login user
export const loginUser = (loginData) => {
  return publicAxios
    .post(`/auth/login`, loginData)
    .then((response) => response.data);
};
