import { ENVIRONMENT } from "@/configurations";
import axios, { AxiosInstance, AxiosResponse } from "axios";

const HttpService: AxiosInstance = axios.create({
  baseURL: ENVIRONMENT.baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const requestManager = [
  (config: any) => {
    const authToken = window.localStorage.getItem("token");
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error: unknown) => {
    return Promise.reject(error);
  },
];

export const responseManager = [
  (response: AxiosResponse) => {
    return response;
  },
  async (error: any) => {
    if (
      error.response?.status === 401 &&
      error.config &&
      !error.config.__isRetryRequest
    ) {
      error.config.__isRetryRequest = true;
      // refreshTokenReq();
    }
    return Promise.reject(error);
  },
];


HttpService.interceptors.request.use(...requestManager);
HttpService.interceptors.response.use(...responseManager);

export default HttpService;