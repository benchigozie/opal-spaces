import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { isTokenExpired, getToken } from '../utils/authUtils';
import { useNavigate } from "react-router-dom";

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

    const navigate = useNavigate();

    useEffect(() => {
        const token = getToken();
        if (token && isTokenExpired(token)) {
            logout();
            navigate('/signin');
        }
    }, []);

    const [user, setUser] = useState<UserType | null>(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    const login = (userData: UserType, token: string,) => {
        setUser(userData);
        setAccessToken(token);
        localStorage.setItem('accessToken', token);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
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

    useEffect(() => {
        
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoggedIn, token: accessToken }}>
            {children}
        </AuthContext.Provider>
    );
};
