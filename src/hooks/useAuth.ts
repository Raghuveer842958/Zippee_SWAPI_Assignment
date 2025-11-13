import { useState, useEffect, useRef, useCallback } from "react";

interface Tokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

const LOCAL_STORAGE_KEY = "auth_tokens";

export function useAuth() {
  const [user, setUser] = useState<string | null>(() => {
    // Optionally restore user on init if saved
    return localStorage.getItem("username") || null;
  });

  const [tokens, setTokens] = useState<Tokens | null>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Save tokens to localStorage when they change
  useEffect(() => {
    if (tokens) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tokens));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }, [tokens]);

  // Save username to localStorage for persistence
  useEffect(() => {
    if (user) localStorage.setItem("username", user);
    else localStorage.removeItem("username");
  }, [user]);

  const login = (username: string, password: string) => {
    if (username && password) {
      const fakeTokens: Tokens = {
        accessToken: "access-token-" + Math.random().toString(36),
        refreshToken: "refresh-token-" + Math.random().toString(36),
        expiresIn: 60000,
      };
      setUser(username);
      setTokens(fakeTokens);
      startSilentRefresh(fakeTokens.expiresIn);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setTokens(null);
    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
      refreshIntervalRef.current = null;
    }
  };

  const refreshTokens = useCallback(() => {
    console.log("Silent refresh triggered");
    if (!tokens) return;
    const newTokens: Tokens = {
      accessToken: "access-token-" + Math.random().toString(36),
      refreshToken: tokens.refreshToken,
      expiresIn: 60000,
    };
    setTokens(newTokens);
  }, [tokens]);

  const startSilentRefresh = (expiresIn: number) => {
    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
    }
    const refreshTime = expiresIn - 10000;
    refreshIntervalRef.current = setInterval(
      () => {
        refreshTokens();
      },
      refreshTime > 0 ? refreshTime : expiresIn
    );
  };

  useEffect(() => {
    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, []);

  return { user, tokens, login, logout };
}
