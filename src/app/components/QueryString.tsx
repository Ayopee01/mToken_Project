"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
// hooks
import { useAuth } from "../hooks/auth-hook";

const BASE_PATH = process.env.NEXT_PUBLIC_API_ROUTE ?? "";

function QueryString() {
  const searchParams = useSearchParams();
  const { user, setUser } = useAuth();
  const inFlightRef = useRef(false);
  const backBtnSetRef = useRef(false);

  useEffect(() => {
    if (backBtnSetRef.current) return;
    backBtnSetRef.current = true;

    window.czpSdk?.setBackButtonVisible?.(true);
  }, []);

  useEffect(() => {
    const appId = searchParams.get("appId");
    const mToken = searchParams.get("mToken");

    if (!appId || !mToken) return;

    const loginKey = `dga_login_done:${appId}|${mToken}`;

    // ถ้าเคย login แล้ว ให้เติม appId เข้า user อีกรอบ
    if (sessionStorage.getItem(loginKey) === "done") {
      if (user && user.appId !== appId) {
        setUser({
          ...user,
          appId,
        });
      }
      return;
    }

    if (inFlightRef.current) return;
    inFlightRef.current = true;

    const handleLogin = async (appId: string, mToken: string, loginKey: string) => {
      try {
        const res = await fetch(`${BASE_PATH}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ appId, mToken }),
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok || !data?.success) {
          sessionStorage.removeItem(loginKey);
          console.error("Login Error:", data?.error || data?.message || res.status);
          return;
        }

        const nextUser = data.user
          ? {
              ...data.user,
              appId,
            }
          : null;

        setUser(nextUser);

        // ค่อย mark done หลัง login สำเร็จ
        sessionStorage.setItem(loginKey, "done");

        const userId = data.user?.userId;
        if (!userId) {
          console.warn("Login OK but missing userId for notification");
          return;
        }

        const notiKey = `dga_noti_done:${appId}|${mToken}`;
        if (sessionStorage.getItem(notiKey) === "sent") return;
        sessionStorage.setItem(notiKey, "sent");

        const nRes = await fetch(`${BASE_PATH}/api/auth/notification`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            appId,
            userId: String(userId),
            message: "เข้าสู่ระบบสำเร็จ",
            mToken,
          }),
        });

        const nData = await nRes.json().catch(() => ({}));

        if (!nRes.ok || nData?.success === false) {
          console.warn("Notification Failed:", nData?.message || nData?.error || nRes.status);
        }
      } catch (err) {
        console.error("Network Error:", err);
        sessionStorage.removeItem(loginKey);
      } finally {
        inFlightRef.current = false;
      }
    };

    void handleLogin(appId, mToken, loginKey);
  }, [searchParams, user, setUser]);

  return null;
}

export default QueryString;