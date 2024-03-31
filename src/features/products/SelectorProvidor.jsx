import { createContext, useContext, useState } from "react";

const selectorProvider = createContext();

function SelectorProvider({ children }) {
  const [value, setValue] = useState(0);
  const [selectedItem, setSelectedItem] = useState("");

  function handleClick(e) {
    setValue(e.target.value);
  }

  function handleChange(e) {
    setSelectedItem(e.target.value);
  }

  return (
    <selectorProvider.Provider
      value={{ value, handleClick, handleChange, selectedItem }}
    >
      {children}
    </selectorProvider.Provider>
  );
}

function useSelectProvide() {
  const context = useContext(selectorProvider);
  if (context === undefined)
    throw new Error("useProDetail must be used within a Provider");
  return context;
}

export { SelectorProvider, useSelectProvide };
