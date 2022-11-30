import { createContext, useState } from "react";

export const OpenAuthContext = createContext();

const OpenAuthProvider = ({ children }) => {
  const [authOpened, setAuthOpened] = useState(false);
  return (
    <OpenAuthContext.Provider value={{ authOpened, setAuthOpened }}>
      {children}
    </OpenAuthContext.Provider>
  );
};

export default OpenAuthProvider;
