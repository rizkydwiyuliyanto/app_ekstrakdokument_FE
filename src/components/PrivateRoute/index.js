import { useContext, useEffect } from "react";
import { Content } from "context/user-context";
import { Navigate, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const index = ({ children }) => {
  const { user, setUser } = useContext(Content);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/authentication/sign-in" replace state={{ from: location }} />;
  }
  return children;
};

export default index;
