import { createContext, useContext, useState } from "react";
import AuthContext from "./AuthContext";
import ToastContext from "./ToastContext";
import instance from "../Functions/Axios";
import { getData } from "../Functions/localStorage";

const APICallContext = createContext();

export const APICallContextProvider = ({ children }) => {
    const { setIsAuthenticated } = useContext(AuthContext)
    const { setToastMessage } = useContext(ToastContext);

    const refreshToken = async () => {
        try {
            const response = await axios.post(`http://localhost:8003/api/user/token/refresh/`, {
                refresh: getData("refreshToken"),
            });
            const newAccessToken = response.data.access;
            return newAccessToken;
        } catch (error) {
            throw error;
        }
    };

    instance.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response) {
                const { status } = error.response;
                if (status === 401) {
                    try {
                        const newAccessToken = await refreshToken();
                        if (newAccessToken) {
                            localStorage.setItem("accessToken", newAccessToken);
                            error.config.headers.Authorization = `Bearer ${newAccessToken}`;
                            return axios(error.config);
                        } else {
                            localStorage.clear();
                            setIsAuthenticated(false);
                        }
                    } catch (refreshError) {
                        localStorage.clear();
                        setIsAuthenticated(false);
                    }
                }
            }
            return Promise.reject(error);
        }
    );

    const apiCall = async (endpoint, body, method, loadingState, onSuccess, onError) => {
        loadingState(true);
        await instance[method](endpoint, body)
            .then((response) => {
                let data = response.data;
                loadingState(false);
                return onSuccess(data);
            })
            .catch((error) => {
                loadingState(false);
                setToastMessage(error?.response?.data?.detail || "An error occurred. Please try again.");
                return onError(error);
            });
    };

    return (
        <APICallContext.Provider value={{ apiCall }}>
            {children}
        </APICallContext.Provider>
    );
}

export default APICallContext;
