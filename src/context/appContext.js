import { createContext, useEffect, useState } from "react";
import { isAuthenticated } from "../hook/useAuth";
import { getData } from "../hook/useApp";
import { getCategory } from "../hook/useApp";


const AppContext = createContext({
    fileList: [],
    setFileList: (value) => { },
    categoryList: [],
    setCategoryList: (value) => { }
});

export const AppProvider = ({ children }) => {
    const [fileList, setFileList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        const checkLoggedIn = async () => {
            let cuser = isAuthenticated();
            if (cuser) {
                console.log("I am called");

                const files = await getData();
                if (files && files.length) {
                    const tempFiles = [...files];
                    setFileList(tempFiles);
                }

                const categories = await getCategory();
                if (categories && categories.length) {
                    const tempCatetories = [...categories];
                    setCategoryList(tempCatetories);
                }
            } else {
                setFileList([]);
                setCategoryList([]);
            }
        };
        checkLoggedIn();
    }, [])

    return (
        <AppContext.Provider value={{ fileList, setFileList, categoryList, setCategoryList }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;



// import { createContext, useEffect, useState } from "react";
// import { isAuthenticated } from "../hook/useAuth";
// import { getData } from "../hook/useApp";

// const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//     const [fileList, setFileList] = useState([]);

//     useEffect(() => {
//         const checkLoggedIn = async () => {
//             let cuser = isAuthenticated();
//             if (cuser) {
//                 console.log("I am called");
//                 const files = await getData();
//                 console.log(files);
//                 setFileList(['fds', 'fsaf']);
//             } else {
//                 setFileList([]);
//             }
//         };
//         checkLoggedIn();
//     }, [])

//     return (
//         <AppContext.Provider value={ [fileList, setFileList] }>
//             {children}
//         </AppContext.Provider>
//     );
// };

// export default AppContext;