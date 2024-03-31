import { useState } from "react";
import { formatCurrency } from "../../Utility/helpers";
// import { useSelectProvide } from "./SelectorProvidor";

function ProductRange() {
  // const { value, handleClick } = useSelectProvide();
  // const [value, setValue] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState(100000);
  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <span className="label-text">Select price</span>
        <span className="label-text-alt">{formatCurrency(selectedPrice)}</span>
      </label>
      <input
        type="range"
        name="price"
        min={0}
        max={100000}
        value={selectedPrice}
        className="range  range-accent"
        onChange={(e) => setSelectedPrice(e.target.value)}
        step={1000}
      />
    </div>
  );
}

export default ProductRange;
