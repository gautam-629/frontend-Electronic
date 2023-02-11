import { useContext, useEffect, useState } from "react";
import UserContext from "./UserContext";
import { isAdminUser as adminUser } from "../auth/HelperAuth";
import {
  doLoginLocalStorage,
  doLogoutFromLocalStorage,
  getDataFromLocalStorage,
  getUserFromLocalStorage,
  isLoggedIn,
} from "../auth/HelperAuth";
const UserProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isAdminUser, setIsAdminUser] = useState(false);
  /*
        userData:{
            user:{

            },
            jwtToken:""}
        }

*/

  useEffect(() => {
    setIsLogin(isLoggedIn());
    setIsAdminUser(adminUser());
    setUserData(getDataFromLocalStorage());
  }, []);

  //login

  const doLogin = (data) => {
    doLoginLocalStorage(data);
    setIsLogin(true);
    setIsAdminUser(adminUser());
    setUserData(getDataFromLocalStorage());
  };

  //logout
  const doLogout = () => {
    doLogoutFromLocalStorage();
    setIsLogin(false);
    setIsAdminUser(adminUser());
    setUserData(null);
  };

  return (
    <UserContext.Provider
      value={{
        userData: userData,
        //you can remove setUserData method:
        setUserData: setUserData,
        isLogin: isLogin,
        isAdminUser: isAdminUser,
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
