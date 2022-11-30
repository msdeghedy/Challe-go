import { createContext, useState } from "react";

export const SecondUserContext = createContext();

const SecondUserProvider = ({ children }) => {
  const [secondUser, setSecondUser] = useState("");
  return (
    <SecondUserContext.Provider value={{ secondUser, setSecondUser }}>
      {children}
    </SecondUserContext.Provider>
  );
};

export default SecondUserProvider;
