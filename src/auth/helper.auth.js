//data: save localstorage

export const doLoginLocalStorage = (data) => {
  localStorage.setItem("userData", JSON.stringify(data));
  //   next();
};

//data : fetch
export const getUserFromLocalStorage = () => {
  const data = getDataFromLocalStorage();
  if (data != null) {
    return data.user;
  }
  return null;
};

export const getTokenFromLocalStorage = () => {
  const data = getDataFromLocalStorage();
  if (data != null) {
    return data.jwtToken;
  }
  return null;
};

export const getDataFromLocalStorage = () => {
  const data = localStorage.getItem("userData");
  if (data != null) {
    return JSON.parse(data);
  }
  return null;
};

export const isLoggedIn = () => {
  if (getTokenFromLocalStorage()) {
    return true;
  } else {
    return false;
  }
};

//data : remove: logout

export const doLogoutFromLocalStorage = () => {
  localStorage.removeItem("userData");
};

//add
