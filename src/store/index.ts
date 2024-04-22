import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import createAuthSlice, { TAuthState } from "@/store/slices/authSlice";
import createNotificationSlice, { TNotificationState } from "@/store/slices/notificationSlice";

export type TStoreState = TAuthState & TNotificationState;

export const useStore = create<TStoreState>()(
  devtools(
    (...a) => ({
      ...createAuthSlice(...a),
      ...createNotificationSlice(...a),
      /**ekstra slices will be add here */
    }),
    { name: "store" }
  )
);

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("store", useStore);
}
