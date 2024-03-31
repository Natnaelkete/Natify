import { createContext, useContext, useState } from "react";

const productContext = createContext();

function ProductProvider({ children }) {
  const [selectedColors, setSelectedColors] = useState([]);

  const [amount, setAmount] = useState(1);

  const toggleColor = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  function Incrementing() {
    setAmount(amount + 1);
  }

  function Decrementing() {
    if (amount < 2) return amount;
    setAmount(amount - 1);
  }

  return (
    <productContext.Provider
      value={{
        toggleColor,
        selectedColors,
        Incrementing,
        Decrementing,
        amount,
      }}
    >
      {children}
    </productContext.Provider>
  );
}

function useProDetail() {
  const context = useContext(productContext);
  if (context === undefined)
    throw new Error("useProDetail must be used within a Provider");
  return context;
}

export { ProductProvider, useProDetail };
