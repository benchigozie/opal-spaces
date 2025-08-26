import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { isTokenExpired, getToken } from '../utils/authUtils';
import { useCart } from "./CartContext";
import { clearCartFromLocalStorage } from "../utils/cartUtils";

type UserType = {
    firstName?: string,
    lastName?: string,
    email: string,
    id: number,
    role: string,
}

type AuthContextType = {
    user: UserType | null,
    login: (user: UserType, token: string) => void,
    logout: () => void,
    isLoggedIn: boolean,
    token: string | null,
}

type AuthProviderProps = {
    children: ReactNode;
}


export const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider = ({ children }: AuthProviderProps) => {


    const { dispatch } = useCart();

    useEffect(() => {
        const token = getToken();
        if (token && isTokenExpired(token)) {
            logout();
        }
    }, []);

    const [user, setUser] = useState<UserType | null>(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [accessToken, setAccessToken] = useState<string | null>(null);

   
    const login = (userData: UserType, token: string,) => {
        //console.log('this is user Id 1:', userData.id);
        setUser(userData);
        setAccessToken(token);
        localStorage.setItem('accessToken', token);
        localStorage.setItem('user', JSON.stringify(userData));
        console.log('this is user Id:', userData.id);
        
    };
    const logout = () => {
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        dispatch({ type: "CLEAR_CART" });
        clearCartFromLocalStorage();
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('accessToken');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            setAccessToken(storedToken);
            setUser(JSON.parse(storedUser));
            setIsLoggedIn(true);
        }
    }, []);


    return (
        <AuthContext.Provider value={{ user, login, logout, isLoggedIn, token: accessToken }}>
            {children}
        </AuthContext.Provider>
    );
};
