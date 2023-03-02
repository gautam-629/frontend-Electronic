// user related api calls
import { privateAxios, publicAxios } from "./axios.service";

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

export const getUser = (userId) => {
  return publicAxios.get(`/users/${userId}`).then((response) => response.data);
};

//update user

export const updateUser = (user) => {
  return privateAxios
    .put(`/users/${user.userId}`, user)
    .then((response) => response.data);
};

//update user profile picture
export const updateUserProfilePicture = (file, userId) => {
  if (file == null) {
    return;
  }
  const data = new FormData();
  data.append("userImage", file);
  return privateAxios
    .post(`/users/image/${userId}`, data)
    .then((response) => response.data);
};

export const getAllUsers = (pageNumber, pageSize, sortBy, sortDir) => {
  return privateAxios
    .get(
      `/users?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`
    )
    .then((res) => res.data);
};
