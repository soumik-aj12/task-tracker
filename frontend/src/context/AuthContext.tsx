import { createContext, useEffect, useState } from "react";

interface AuthContextType {
  token: string | null;
  user: {
    name: string;
    email: string;
    country: string;
  } | null;
  setUser: React.Dispatch<React.SetStateAction<{
    name: string;
    email: string;
    country: string;
  } | null>>;
  setToken: (token: string | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  user: null,
  setUser: () => {},
  setToken: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{
    name: string;
    email: string;
    country: string;
  } | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleSetToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
    setToken(newToken);
  };

  return (
    <AuthContext.Provider
      value={{ token, setToken: handleSetToken, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
