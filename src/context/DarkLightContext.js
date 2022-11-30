import { createContext, useState } from "react";

export const DarkLightContext = createContext();

const DarkLightProvider = ({ children }) => {
  const [changeMode, setChangeMode] = useState(false);
  return (
    <DarkLightContext.Provider value={{ changeMode, setChangeMode }}>
      {children}
    </DarkLightContext.Provider>
  );
};

export default DarkLightProvider;
