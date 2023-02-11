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
    //server call
    return true;
  } else {
    return false;
  }
};

export const isAdminUser = () => {
  if (isLoggedIn()) {
    const user = getUserFromLocalStorage();
    const roles = user.roles;
    if (roles.find((role) => role.roleId == "wetrsdfwetwfasfwdf")) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

//data : remove: logout

export const doLogoutFromLocalStorage = () => {
  localStorage.removeItem("userData");
};

//add
