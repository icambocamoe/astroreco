import React, { createContext, useState, ReactNode } from "react";

const defaultUserData = {
  userIDRef: null,
  name: null,
  email: null,
  createdAt: null,
  updatedAt: null,
};

export const UserContext = createContext(undefined);

export const UserProvider /* : React.FC<{ children: ReactNode }> */ = ({
  children,
}) => {
  const [userData, setUserData] = useState(
    /* <ThemeData | null> */ defaultUserData
  );

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
