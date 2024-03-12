import { loginService } from "@/services";
import { AxiosResponse } from "@/services/types";
import { signIn } from "next-auth/react";
import { StateCreator } from "zustand";

export type LoginType = {
  email: string;
  password: string;
};

export type TAuthState = {
  isAuthenticated: boolean;
  token?: string;
  /** actions */
  logout: () => void;
  login: (data: LoginType) => Promise<void>;
  refreshTokenReq: () => void;
};

const createAuthSlice: StateCreator<TAuthState> = (set, get) => ({
  isAuthenticated: false,
  token: undefined,
  login: async (data: LoginType) => {
    try {
      const response: AxiosResponse = await loginService(data);

      console.log(response);

      localStorage.setItem("apposite-token", response?.data?.data?.token);
      localStorage.setItem("apposite-refreshToken", response?.data?.data?.refreshToken);
      let res = await signIn("credentials", {
        refreshToken: response?.data?.data?.refreshToken,
        token: response?.data?.data?.token,
        email: data.email,
        password: data.password,
        redirect: true,
        callbackUrl: "/",
      });

      set((state: TAuthState) => ({
        ...state,
        isAuthenticated: true,
        token: response?.data?.data?.token,
      }));
    } catch (e) {}
  },
  logout: () => {},
  refreshTokenReq: () => {},
});

export default createAuthSlice;
