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
  /** actions */
  logout: () => Promise<void>;
  login: (data: LoginType) => Promise<void>;
  refreshTokenReq: () => void;
};

const createAuthSlice: StateCreator<TAuthState> = (set, get) => ({
  login: async (data: LoginType) => {
    try {
      const response: AxiosResponse = await loginService(data.requestData);
      if (response.status !== 200) return Promise.reject(response);

      localStorage.setItem("apposite-refreshToken", response?.data?.data?.refreshToken); // useSession().data?.refreshToken
      await signIn("credentials", {
        refreshToken: response?.data?.data?.refreshToken,
        token: response?.data?.data?.token,
        email: data.requestData.email,
        password: data.requestData.password,
        redirect: true,
        callbackUrl: data.callbackUrl,
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
  refreshTokenReq: () => { },
});

export default createAuthSlice;
