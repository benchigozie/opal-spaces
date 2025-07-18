import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, isTokenExpired } from "../utils/authUtils";
import { useAuth } from "./useAuth";
import api from "../api/axios";

export const useAPIInterceptor = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    
    useEffect(() => {
        const requestInterceptor = api.interceptors.request.use(
            (config) => {
              const token = getToken();
              if (token && !isTokenExpired(token)) {
                config.headers.Authorization = `Bearer ${token}`;
              } 

              return config;
            },
            (error) => Promise.reject(error)
          );

          const responseInterceptor = api.interceptors.response.use(
            (response) => response,
            async (error) => {
              const originalRequest = error.config;
              if (
                error.response?.status === 401 &&
                !originalRequest._retry
              ) {
                originalRequest._retry = true;
      
                try {
                  const res = await api.post("/api/auth/refresh", {}, { withCredentials: true });
      
                  const newAccessToken = res.data.accessToken;
                  localStorage.setItem("accessToken", newAccessToken);
      
                  originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                  return api(originalRequest);
                } catch (refreshError) {
                  logout();
                  navigate("/signin");
                  return Promise.reject(refreshError);
                }
              }
              return Promise.reject(error);
            }
          );
      
          return () => {
            api.interceptors.request.eject(requestInterceptor);
            api.interceptors.response.eject(responseInterceptor);
          };
    }, [navigate, logout]);
}