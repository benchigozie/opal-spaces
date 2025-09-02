import { jwtDecode } from 'jwt-decode';

type DecodedToken = {
    exp: number;
    [key: string]: any;
};

export const isTokenExpired = (token : string | null ): boolean => {
    try {
    const decoded = jwtDecode<DecodedToken>(token || '');
    const now = Date.now() / 1000; // seconds
    console.log('Token expiration time:', decoded.exp, `token expired: ${decoded.exp < now}`);
    return decoded.exp < now;
    } catch (error) {
        console.error("Error decoding token:", error);
        return true;
    }
};

export const getToken = () : string | null => {
    return localStorage.getItem('accessToken');
};

