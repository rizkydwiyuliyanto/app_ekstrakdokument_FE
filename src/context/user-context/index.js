/* eslint-disable prettier/prettier */
import { createContext, useEffect } from "react";
import useAuth from "./useAuth";
import privateRoutes from "private_routes";
const Content = createContext(null);
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const Provider = ({ children }) => {
    const navigate = useNavigate();
    const { user, setUser } = useAuth();
    return (
        <Content.Provider
            value={{
                user,
                setUser
            }}
        >
            {children}
        </Content.Provider>
    );
};

export {
    Provider,
    Content
};
