import { createContext, useState, useContext } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({
    user: null,
    setUser: () => { },
    loginStatus: false,
    setLoginStatus: () => { }
});

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loginStatus, setLoginStatus] = useState(false);
    const [localStorageValue, setLocalStorageValue] = useState(null);

    const setItem = (key, value) => {
        localStorage.setItem(key, value);
        setLocalStorageValue(value);
    };

    const getItem = (key) => {
        const value = localStorage.getItem(key);
        setLocalStorageValue(value);
        return value;
    };

    const removeItem = (key) => {
        localStorage.removeItem(key);
        setLocalStorageValue(null);
    };

    const addUser = (userData) => {
        setUser(userData);
        setItem("user", JSON.stringify(userData));
    };

    const removeUser = () => {
        setUser(null);
        setItem("user", "");
        navigate("/");
        return true;
    };

    const login = async (credentials) => {
        try {
            const response = await axios.post('https://0f28-45-8-22-59.ngrok-free.app/api/users/signin', credentials);
            if (response.data.authToken) {
                localStorage.setItem('user', JSON.stringify(response.data));
                addUser(response.data);
                setLoginStatus(false);
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Login failed:', error);
            setLoginStatus(true);
        }
    };

    const logout = () => {
        removeUser();
    }

    return (
        <AuthContext.Provider value={{ user, setUser, loginStatus, setLoginStatus, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);