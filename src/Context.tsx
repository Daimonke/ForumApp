import React, { createContext, useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

type Ctx = {
  user: {
    id: number;
    username: string;
  } | null;
  setUser: (user: Ctx["user"]) => void;
};

const initialValue: Ctx = {
  user: null,
  setUser: (user) => {},
};

export const context = createContext(initialValue);

const getUser = async () => {
  console.log("yo");
  const user = await fetch("/auth/verifyUser");
  const userJson = await user.json();
  if (userJson.success) {
    return {
      id: userJson.id,
      username: userJson.username,
    };
  }
};

const Context = ({ children }: Props) => {
  const [user, setUser] = useState(initialValue.user);

  const getUser = async () => {
    const user = await fetch("/auth/verifyUser");
    const userJson = await user.json();
    if (userJson.success) {
      setUser({
        id: userJson.id,
        username: userJson.username,
      });
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <context.Provider value={{ user, setUser }}>{children}</context.Provider>
  );
};

export default Context;
