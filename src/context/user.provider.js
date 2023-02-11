import { useContext, useEffect, useState } from "react";
import UserContext from "./user.context";
import {
  doLoginLocalStorage,
  doLogoutFromLocalStorage,
  getDataFromLocalStorage,
  getUserFromLocalStorage,
  isLoggedIn,
} from "./../auth/helper.auth";
const UserProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  /*
        userData:{
            user:{

            },
            jwtToken:""}
        }

*/

  useEffect(() => {
    setIsLogin(isLoggedIn());

    setUserData(getDataFromLocalStorage());
  }, []);

  //login

  const doLogin = (data) => {
    doLoginLocalStorage(data);
    setIsLogin(true);
    setUserData(getDataFromLocalStorage());
  };

  //logout
  const doLogout = () => {
    doLogoutFromLocalStorage();
    setIsLogin(false);
    setUserData(null);
  };

  return (
    <UserContext.Provider
      value={{
        userData: userData,
        //you can remove setUserData method:
        setUserData: setUserData,
        isLogin: isLogin,
        //you can remove set login method
        setIsLogin: setIsLogin,
        login: doLogin,
        logout: doLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
