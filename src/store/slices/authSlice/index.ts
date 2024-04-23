import { loginService, registerService } from "@/services";
import HttpService from "@/services/httpService";
import { AxiosResponse, IRequestModel } from "@/services/types";
import { AxiosError } from "axios";
import { signIn, signOut } from "next-auth/react";
import { StateCreator } from "zustand";

export type LoginType = {
  requestData: {
    email: string;
    password: string;
  },
  callbackUrl: string;
};

export type RegisterType = {
  name: string;
  surname: string;
  email: string;
  password: string;
};

export type TAuthState = {
  /** actions */
  logout: () => Promise<void>;
  login: (data: LoginType) => Promise<AxiosResponse | any>;
  register: (data: RegisterType) => Promise<AxiosResponse>;
  refreshTokenReq: () => void;
};

const createAuthSlice: StateCreator<TAuthState> = (set, get) => ({
  login: async (data: LoginType) => {
    try {
      const response: AxiosResponse = await loginService(data.requestData);
      if (response.status !== 200) return Promise.reject(response);

      const personalData: AxiosResponse = await HttpService.get("User/getPersonalInfo", {
        headers: {
          Authorization: `Bearer ${response?.data?.data?.token}`
        }
      });
      let isFirstLogin = personalData.data?.data?.ingredients.length === 0;
      isFirstLogin = isFirstLogin && personalData.data?.data?.healths.length === 0;
      isFirstLogin = isFirstLogin && personalData.data?.data?.cuisines.length === 0;

      localStorage.setItem("apposite-refreshToken", response?.data?.data?.refreshToken); // useSession().data?.refreshToken
      await signIn("credentials", {
        refreshToken: response?.data?.data?.refreshToken,
        token: response?.data?.data?.token,
        email: data.requestData.email,
        password: data.requestData.password,
        redirect: true,
        callbackUrl: isFirstLogin ? "/firstlogin" : data.callbackUrl,
      });
    } catch (e) {
      return Promise.reject(e);
    }
  },
  logout: async () => {
    try {
      await signOut({
        callbackUrl: "/login",
        redirect: true
      });
      localStorage.removeItem("apposite-refreshToken");
    } catch (e) {
      return Promise.reject(e);
    }
  },
  register: async (data: RegisterType): Promise<AxiosResponse> => {
    const newData = {
      name: data.name,
      surname: data.surname,
      email: data.email,
      userName: (data.name + data.surname).replace(" ", "") + Math.floor(Math.random() * 1000 + 8999),
      password: data.password,
    };
    try {
      const response: AxiosResponse = await registerService(newData);
      return Promise.resolve(response);
    } catch (e) {
      if (e instanceof AxiosError)
        return Promise.reject(e.response);
      return Promise.reject(e);
    }
  },
  refreshTokenReq: () => { },
});

export default createAuthSlice;
