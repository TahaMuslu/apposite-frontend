import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import createAuthSlice, { TAuthState } from "@/store/slices/authSlice";
import createNotificationSlice, { TNotificationState } from "@/store/slices/notificationSlice";
import createGlobalSlice, { TGlobalState } from "@/store/slices/globalSlice";

export type TStoreState = TAuthState & TNotificationState & TGlobalState;

export const useStore = create<TStoreState>()(
  devtools(
    (...a) => ({
      ...createAuthSlice(...a),
      ...createNotificationSlice(...a),
      ...createGlobalSlice(...a),
      /**ekstra slices will be add here */
    }),
    { name: "store" }
  )
);

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("store", useStore);
}
