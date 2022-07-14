import React, { createContext, useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

type Ctx = {
  user:
    | {
        id: number;
        username: string;
      }
    | false
    | null;
  setUser: (user: Ctx["user"]) => void;
};

const initialValue: Ctx = {
  user: false,
  setUser: (user) => {},
};

export const context = createContext(initialValue);

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
    } else {
      setUser(null);
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
