import { createContext, useState, useEffect } from "react";
import { isAuthenticated } from "../hook/useAuth";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const checkLoggedIn = async () => {
            let cuser = isAuthenticated();
            if (cuser) {
                setCurrentUser(jwtDecode(cuser).user);
            } else {
                setCurrentUser(undefined);
            }
        };
        checkLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={ [currentUser, setCurrentUser] }>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;