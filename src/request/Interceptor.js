import { Content } from "context/user-context";
import { useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import instance from "./instance";
import axios from "axios";

const checkExpired = () => {
  const tokenSToString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenSToString);
  const currentDate = new Date();
  if (userToken) {
    const decodeJwt = jwtDecode(userToken);
    if (decodeJwt.exp && decodeJwt.exp * 1000 < currentDate.getTime()) {
      return 1;
    }
    return 0;
  }
};

const refreshToken = async () => {
  const tokentoString = localStorage.getItem("token");
  const userToken = JSON.parse(tokentoString);
  let result = "";
  if (checkExpired()) {
    const { iss } = jwtDecode(userToken);
    try {
      let { data } = await axios.post("http://localhost:3005/auth/sign-in", {
        ...iss,
      });
      result = data;
      return result;
    } catch (err) {
      console.log(err);
      return "";
    }
  }
  return result;
};

const Interceptor = ({ children }) => {
  const [isSet, setIsSet] = useState(false);
  const { setUser } = useContext(Content);

  useEffect(() => {
    const reqInterceptor = async (config) => {
      console.log("private route");
      const tokenSToString = localStorage.getItem("token");
      const userToken = JSON.parse(tokenSToString);
      config.headers = { authorization: userToken };
      let data = await refreshToken();
      if (data !== "") {
        setUser(data);
        config.headers = { authorization: data };
      }
      return config;
    };
    const errRequest = (err) => {
      console.log("Ada error");
      return Promise.reject(err);
    };
    const interceptor = instance.interceptors.request.use(reqInterceptor, errRequest);

    setIsSet(true);
    return () => instance.interceptors.request.eject(interceptor);
  }, []);
  return isSet && children;
};
export { Interceptor };
