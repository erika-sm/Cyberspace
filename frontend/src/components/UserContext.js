import React, { useState } from "react";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [error, setError] = useState(false);
  const [loggedIn, setLoggedIn] = useState({});
  const [newUser, setNewUser] = useState({
    id: "",
    name: "",
    bio: "",
    friends: [],
    avatarUrl: "",
  });

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        error,
        setError,
        loggedIn,
        setLoggedIn,
        newUser,
        setNewUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
