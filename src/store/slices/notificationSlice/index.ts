import { IconType, NotificationPlacement } from "antd/es/notification/interface";
import { StateCreator } from "zustand";

export type NotificationType = {
  type: IconType;
  message: string;
  description?: string;
  duration?: number;
  placement?: NotificationPlacement;
  className?: string;
};

export type TNotificationState = {
  showNotification: (data: NotificationType) => void;
  notificationState: NotificationType;
};

const createNotificationSlice: StateCreator<TNotificationState> = (set, get) => ({
  showNotification: (data: NotificationType) => {
    var notificationState = {} as NotificationType;
    if (data.className === "" || !data.className)
      notificationState.className = "";
    if (data.description === "" || !data.description)
      notificationState.description = "";
    if (!data.duration)
      notificationState.duration = 3;
    if (!data.placement)
      notificationState.placement = "bottomRight";

    notificationState = { ...notificationState, ...data };

    set({ notificationState });
  },
  notificationState: {
    type: "info",
    message: "",
    description: "",
    duration: 3,
    placement: "bottomRight",
    className: "",
  }
});

export default createNotificationSlice;
