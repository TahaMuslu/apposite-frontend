"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { ConfigProvider, notification } from "antd";
import { useEffect } from "react";
import { useStore } from "@/store";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [api, notificationHolder] = notification.useNotification();
  const { notificationState } = useStore();


  useEffect(() => {
    if (
      notificationState.type !== undefined &&
      notificationState.message !== ""
    ) {
      api[notificationState.type]({
        message: notificationState.message,
        description: notificationState.description,
        placement: notificationState.placement,
        duration: notificationState.duration,
        className: notificationState.className,
        type: notificationState.type,
      });
    }
  }, [notificationState]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <ConfigProvider
            theme={{
              components: {
              },
              token: {
              }
            }}
          >
            {notificationHolder}
            {children}
          </ConfigProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
