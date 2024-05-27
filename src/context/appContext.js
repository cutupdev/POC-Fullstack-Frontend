import { createContext, useEffect, useState } from "react";
import { isAuthenticated } from "../hook/useAuth";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [fileList, setFileList] = useState(undefined);

    useEffect(() => {
        const checkLoggedIn = async () => {
            let cuser = isAuthenticated();
            if (cuser) {
                console.log("I am called");
                setFileList([]);
            } else {
                setFileList(undefined);
            }
        };
        checkLoggedIn();
    }, [])

    return (
        <AppContext.Provider value={ [fileList, setFileList] }>
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;