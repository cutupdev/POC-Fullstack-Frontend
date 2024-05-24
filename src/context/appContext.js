import { createContext, useState, useContext } from "react";
import axios from 'axios';

export const AppContext = createContext({
    newFile: {},
    setNewFile: () => { }, 
    fileLength: 0,
    setFileLength: () => { },
    categoryList: [],
    setCategoryList: () => { },
});

export const AppProvider = ({ children }) => {
    const [newFile, setNewFile] = useState({});
    const [fileLength, setFileLength] = useState(0);
    const [categoryList, setCategoryList] = useState([]);

    const setCategory = (value) => {
        // localStorage.setItem(key, value);
        // setLocalStorageValue(value);
    };

    const addFile = (data) => {

    }

    const removeFile = (data) => {
        setNewFile({});
    }

    return (
        <AppContext.Provider value={{ categoryList, setCategoryList, fileLength, newFile, setCategory, addFile, removeFile,  }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);