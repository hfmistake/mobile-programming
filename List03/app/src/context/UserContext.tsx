import React, { createContext, useState, useContext, ReactNode } from "react";
import { User } from "../models/userSchema";

interface UserContextType {
  users: User[];
  addUser: (user: User) => void;
  getUsers: () => User[];
  getUser: (id: number) => User | undefined;
  deleteUser: (id: number) => void;
  editUser: (newUser: User, id: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const addUser = (user: User) => {
    setUsers([...users, user]);
  };
  const deleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };
  const getUser = (id: number) => users.find((user) => user.id === id);
  const getUsers = () => users;
  const editUser = (newUser: User, id: number) => {
    setUsers(users.map((user) => (user.id === id ? newUser : user)));
  };

  return (
    <UserContext.Provider
      value={{ users, addUser, getUsers, deleteUser, getUser, editUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext deve ser usado dentro de um UserProvider");
  }
  return context;
};
