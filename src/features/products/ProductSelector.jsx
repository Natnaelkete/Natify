function ProductSelector({ label, list, name }) {
  return (
    <div>
      <label className="form-control ">
        <label htmlFor={name} className="label">
          <span className="label-text">{label}</span>
        </label>

        <select
          className="select select-bordered select-sm w-full max-w-full"
          name={name}
          id={name}
        >
          {list.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default ProductSelector;
