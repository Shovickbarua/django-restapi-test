import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export const UserContext = createContext()

const UserProvider = ({ children }) => {
  const storedUser = window.localStorage.getItem("user");
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const authenticated = useMemo(() => !!user, [user]);

  useEffect(() => {
    if (user) {
      window.localStorage.setItem("user", JSON.stringify(user));
    } else {
      window.localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, authenticated }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useAuth = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }

  return context;
}