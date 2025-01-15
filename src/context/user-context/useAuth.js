import { jwtDecode } from "jwt-decode";
import { useState } from "react";
// import jwtDecode from "jwt-decode";

const useAuth = () => {
  const getUser = () => {
    const tokenSToString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenSToString);
    const currentDate = new Date();
    let result = userToken;
    if (userToken) {
      const decodeJwt = jwtDecode(userToken);
      if (decodeJwt.exp && decodeJwt.exp * 1000 < currentDate.getTime()) {
        result = null;
      } else {
        result = {
          ...decodeJwt.iss,
          token: userToken,
        };
      }
    }
    return result;
  };
  const [data, setData] = useState(getUser());
  const saveToken = (userToken) => {
    if (userToken === null) {
      localStorage.removeItem("token");
      setData(null);
    } else {
      const decodeJwt = jwtDecode(userToken);
      setData({
        ...decodeJwt.iss,
        token: userToken,
      });
      localStorage.setItem("token", JSON.stringify(userToken));
    }
  };
  return {
    user: data,
    setUser: saveToken,
  };
};

export default useAuth;
