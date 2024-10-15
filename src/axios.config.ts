import ProgressService from "@/services/progress.service";

import axios, {AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import StorageService from "@/services/storage.service";

const defaultOptions = {
    baseURL: import.meta.env.VITE_API_URL,
    addTokenToHeader: true,
    headers: {
        'Content-Type': 'application/json',
    }
};

const axiosInstance: AxiosInstance = axios.create(defaultOptions);


function addTokenToRequest(config: InternalAxiosRequestConfig): void {
    const token = StorageService.getItem("token");
    if (!token) return;

    config.headers.Authorization = token ? `Bearer ${token}` : '';
}

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {

        addTokenToRequest(config);

        ProgressService.startRequest();

        return config;
    },
    (error) => {
        ProgressService.doneRequest();
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use((response: AxiosResponse) => {
        ProgressService.doneRequest();
        return response;
    },
    (error) => {
        ProgressService.doneRequest();
        return Promise.reject(error);
    },
);

export default axiosInstance;