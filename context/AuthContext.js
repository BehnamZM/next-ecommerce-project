import { createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const login = async () => {
    console.log("logged in");
  };
  return (
    <AuthContext.Provider value={{ login }}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
