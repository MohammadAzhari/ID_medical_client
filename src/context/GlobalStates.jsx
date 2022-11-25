import React, { createContext, useContext } from "react";

const Context = createContext();

export default function GlobalProvider({ children }) {
  return <Context.Provider value={{}}>{children}</Context.Provider>;
}

export const GlobalState = () => useContext(Context);
