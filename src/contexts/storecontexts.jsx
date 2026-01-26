// src/contexts/storecontexts.js
import { createContext, useContext, useEffect, useMemo, useState, useRef } from "react";

const StoreContext = createContext(undefined);

const POLL_INTERVAL_MS = 2 * 60 * 1000; // 2 minutes

// helper to remove sensitive fields before storing user client-side
const sanitizeUser = (user) => {
  if (!user) return null;
  const { password, ...rest } = user;
  return rest;
};

// helper: decode jwt payload (client-side only, no verification)
const decodeJwt = (token) => {
  try {
    if (!token || typeof token !== "string") return null;
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const payload = parts[1];
    const json =
      typeof atob === "function"
        ? atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
        : Buffer.from(payload, "base64").toString("utf8");
    return JSON.parse(json);
  } catch {
    return null;
  }
};

export const StoreProvider = ({ children }) => {

  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return sanitizeUser(raw ? JSON.parse(raw) : null);
  });
  const [loading, setLoading] = useState(true);

  const intervalRef = useRef(null);
  const abortRef = useRef(null);

  // ---------- getToken ----------
  const getToken = () => {
    try {
      const t = localStorage.getItem("token");
      const expiry = parseInt(localStorage.getItem("tokenExpiry") || "0", 10);

      if (!t || Date.now() > expiry) {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiry");
        setToken(null);
        setUser(null);
        return null;
      }
      return t;
    } catch {
      return null;
    }
  };

  const isLoggedIn = useMemo(() => !!token && !!user, [token, user]);

  // ---------- keep user in sync ----------
  useEffect(() => {
    try {
      const toStore = sanitizeUser(user);
      if (toStore && Object.keys(toStore).length > 0) {
        localStorage.setItem("user", JSON.stringify(toStore));
      } else {
        localStorage.removeItem("user");
      }
    } catch {}
  }, [user]);

  // ---------- persist token ----------
  useEffect(() => {
    try {
      if (!token) {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiry");
        return;
      }
      const decoded = decodeJwt(token);
      const expiresAt = decoded?.exp ? decoded.exp * 1000 : Date.now() + 7 * 24 * 60 * 60 * 1000;
      localStorage.setItem("token", token);
      localStorage.setItem("tokenExpiry", String(expiresAt));
    } catch (e) {
      console.error("Error storing token:", e);
    }
  }, [token]);

  // ---------- verifySession ----------
  const verifySession = async () => {
    setLoading(true);
    try {
      const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";
      const effectiveToken = token || localStorage.getItem("token");
      if (!effectiveToken) return null;

      const headers = { "Content-Type": "application/json", Authorization: `Bearer ${effectiveToken}` };
      const res = await fetch(`${BASE}/auth/verify/me`, { method: "GET", credentials: "include", headers });
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) await LogoutTrue(false);
        setLoading(false);
        return null;
      }
      const data = await res.json();
      const fetchedUser = data.user ?? data;
      setUser(sanitizeUser(fetchedUser));
      setLoading(false);
      return fetchedUser;
    } catch (err) {
      console.error("verifySession error:", err);
      await LogoutTrue(false);
      setLoading(false);
      return null;
    }
  };

  // ---------- on mount ----------
  useEffect(() => {
    const t = getToken();
    if (!t) {
      setUser(null);
      setLoading(false);
    } else {
      verifySession();
    }
  }, []);

  // ---------- auto-logout ----------
  useEffect(() => {
    try {
      const expiry = parseInt(localStorage.getItem("tokenExpiry") || "0", 10);
      if (!expiry) return;

      const timeout = expiry - Date.now();
      if (timeout <= 0) {
        LogoutTrue(false);
        return;
      }

      const timer = setTimeout(() => LogoutTrue(false), timeout);
      return () => clearTimeout(timer);
    } catch {}
  }, [token]);

  // ---------- login ----------
  const login = ({ token: newToken, user: newUser }) => {
    if (newToken) setToken(newToken);
    if (newUser) setUser(sanitizeUser(newUser));
  };

  // ---------- Logout ----------
  const LogoutTrue = async (callBackend = true) => {
    const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";
    const bearertoken = token;

    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
    localStorage.removeItem("user");

    if (callBackend) {
      await fetch(`${BASE}/auth/logout`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json", Authorization: bearertoken ? `Bearer ${bearertoken}` : "" },
      }).catch(() => {});
    }
  };

  const getUser = async () => verifySession();
  // const hasRole = (role) => user ? user.role === role || (Array.isArray(user.roles) && user.roles.includes(role)) : false;

  // inside storecontexts.js, replace hasRole:
const hasRole = (role) => {
  if (!user) return false;
  if (typeof role === "string") {
    if (user.role === role) return true;
    if (Array.isArray(user.roles) && user.roles.includes(role)) return true;
    return false;
  }
  // if an array passed
  if (Array.isArray(role)) {
    return role.some((r) => user.role === r || (Array.isArray(user.roles) && user.roles.includes(r)));
  }
  return false;
};



  // ---------- Poll user isActive ----------
  useEffect(() => {
    if (!isLoggedIn || !user?._id) return;

    const checkStatus = async () => {
      const t = getToken();
      if (!t) return;

      if (abortRef.current) abortRef.current.abort();
      abortRef.current = new AbortController();

      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_API}/users/status/${user._id}`,
          { headers: { Authorization: `Bearer ${t}` }, signal: abortRef.current.signal }
        );
        if (!res.ok) return;
        const data = await res.json();
        if (data.isActive === false) LogoutTrue(false);
      } catch (err) {
        if (err.name !== "AbortError") console.error(err);
      }
    };

    checkStatus();
    intervalRef.current = setInterval(checkStatus, POLL_INTERVAL_MS);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (abortRef.current) abortRef.current.abort();
    };
  }, [isLoggedIn, user?._id]);

  const value = useMemo(
    () => ({ token, isLoggedIn, user, login, LogoutTrue, getUser, verifySession, loading, hasRole, getToken }),
    [token, isLoggedIn, user, loading]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside a StoreProvider");
  return ctx;
};
