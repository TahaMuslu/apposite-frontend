import { ENVIRONMENT } from "@/configurations";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { getSession } from "next-auth/react";

const HttpService: AxiosInstance = axios.create({
  baseURL: ENVIRONMENT.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const requestManager = [
  async (config: any) => {
    const session = await getSession();
    const authToken = session?.user?.token;
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error: unknown) => {
    return Promise.reject(error);
  },
];

const responseManager = [
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