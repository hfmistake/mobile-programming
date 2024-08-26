import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useUserContext } from "./UseUserContext";
import { login, logout } from "../services/authService";

interface AuthContextType {
  login: (password: string, email: string) => Promise<boolean>;
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { getCurrentUser } = useUserContext();

  const loginAttempt = useCallback(async (password: string, email: string) => {
    return await login(password, email);
  }, []);

  const userExit = useCallback(async () => {
    return await logout().then(() => setIsAuthenticated(false));
  }, []);

  useEffect(() => {
    (async () => {
      await getCurrentUser().then(() => setIsAuthenticated(true));
    })();
  }, [getCurrentUser]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        login: loginAttempt,
        logout: userExit,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
