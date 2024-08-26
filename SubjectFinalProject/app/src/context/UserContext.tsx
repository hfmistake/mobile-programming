import { User } from "../models/userSchema";
import {getCurrentUser, register} from "../services/userService";
import React, { createContext, ReactNode, useCallback } from "react";

interface UserContextType {
  userRegister: (user: User) => Promise<void>;
  getCurrentUser: () => Promise<User>;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {


  const registerAttempt = useCallback(async (user: User) => {
    return await register(user).catch((error) => {
      console.error("Error occured in registerAttempt", error);
      throw new Error("Error ocurred in registerAttempt")
    });
  }, []);

  const fetchUserData = useCallback(async () => {
    return await getCurrentUser().catch((err) => {
      console.error("Error occured in fetchUserData", err);
      throw new Error("Error occured in fetchUserData");
    });
  }, []);
  return (
    <UserContext.Provider
      value={{
        userRegister: registerAttempt,
        getCurrentUser: fetchUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
