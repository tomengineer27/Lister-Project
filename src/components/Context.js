import React, { createContext, useState, useEffect } from "react";

export const ListerContext = createContext();

function Context({ children }) {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    setLists(JSON.parse(localStorage.getItem("lists")));
  }, []);

  return (
    <ListerContext.Provider value={{ lists, setLists }}>
      {children}
    </ListerContext.Provider>
  );
}

export default Context;
