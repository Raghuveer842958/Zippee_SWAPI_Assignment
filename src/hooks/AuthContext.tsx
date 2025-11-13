import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

interface Tokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

interface AuthContextType {
  user: string | null;
  tokens: Tokens | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const LOCAL_STORAGE_KEY = "auth_tokens";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<string | null>(() =>
    localStorage.getItem("username")
  );
  const [tokens, setTokens] = useState<Tokens | null>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (tokens) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tokens));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }, [tokens]);

  useEffect(() => {
    if (user) localStorage.setItem("username", user);
    else localStorage.removeItem("username");
  }, [user]);

  const refreshTokens = useCallback(() => {
    if (!tokens) return;
    const newTokens: Tokens = {
      accessToken: "access-token-" + Math.random().toString(36),
      refreshToken: tokens.refreshToken,
      expiresIn: 60000,
    };
    setTokens(newTokens);
  }, [tokens]);

  const startSilentRefresh = (expiresIn: number) => {
    if (refreshIntervalRef.current) clearInterval(refreshIntervalRef.current);
    const refreshTime = expiresIn - 10000;
    refreshIntervalRef.current = setInterval(
      () => {
        refreshTokens();
      },
      refreshTime > 0 ? refreshTime : expiresIn
    );
  };

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

  useEffect(() => {
    return () => {
      if (refreshIntervalRef.current) clearInterval(refreshIntervalRef.current);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, tokens, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};