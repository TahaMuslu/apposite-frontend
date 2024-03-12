import { loginService } from "@/services";
import { AxiosResponse } from "@/services/types";
import { signIn, signOut } from "next-auth/react";
import { StateCreator } from "zustand";

export type LoginType = {
  requestData: {
    email: string;
    password: string;
  },
  callbackUrl: string;
};

export type TAuthState = {
  isAuthenticated: boolean;
  token?: string;
  /** actions */
  logout: () => Promise<void>;
  login: (data: LoginType) => Promise<void>;
  refreshTokenReq: () => void;
};

const createAuthSlice: StateCreator<TAuthState> = (set, get) => ({
  isAuthenticated: false,
  token: undefined,
  login: async (data: LoginType) => {
    try {
      const response: AxiosResponse = await loginService(data.requestData);

      localStorage.setItem("apposite-token", response?.data?.data?.token);
      localStorage.setItem("apposite-refreshToken", response?.data?.data?.refreshToken);
      let res = await signIn("credentials", {
        refreshToken: response?.data?.data?.refreshToken,
        token: response?.data?.data?.token,
        email: data.requestData.email,
        password: data.requestData.password,
        redirect: true,
        callbackUrl: data.callbackUrl,
      });

      set((state: TAuthState) => ({
        ...state,
        isAuthenticated: true,
        token: response?.data?.data?.token,
      }));
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
      localStorage.removeItem("apposite-token");
      localStorage.removeItem("apposite-refreshToken");
      set((state: TAuthState) => ({
        ...state,
        isAuthenticated: false,
        token: undefined,
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  },
  refreshTokenReq: () => { },
});

export default createAuthSlice;
