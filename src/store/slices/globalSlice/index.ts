import { StateCreator } from "zustand";



export type TGlobalState = {
  setGlobalLoading: (data: boolean) => void;
  globalLoading: boolean;
};

const createGlobalSlice: StateCreator<TGlobalState> = (set, get) => ({
  setGlobalLoading: (data: boolean) => {
    set({ globalLoading: data });
  },
  globalLoading: false,
});

export default createGlobalSlice;
