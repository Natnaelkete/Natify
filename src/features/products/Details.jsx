import { useParams, useSearchParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

import useGetProductByIds from "../../Utility/getProductByIds";
import { formatCurrency } from "../../Utility/helpers";
import { useTheme } from "../../ui/useThemetoggler";

import { useDispatch, useSelector } from "react-redux";
import { addToCart, toggleColor } from "../cart/CartSlice";
import Spinner from "../../ui/Spinner";

function Details() {
  const [amount, setAmount] = useState(1);
  const id = useParams();
  const { theme } = useTheme();

  const [searchParams] = useSearchParams();

  const name = searchParams.get("name") || "";

  const dispatch = useDispatch();
  // const amount = useSelector((state) => state.cart.cart);
  const selectedColors = useSelector((state) => state.cart.colors);
  const cart = useSelector((state) => state.cart.cart);

  const { isLoading, product } = useGetProductByIds(id.productId);

  const truth = cart.some((item) => item.productId === id.productId);
  // const currentQuantity = useSelector(getCurrentQuantityById(id.productId));

  function handleClick() {
    const newItem = {
      productId: id.productId,
      productImage: product.attributes.image,
      name: product.attributes.title,
      company: product.attributes.company,
      quantity: amount,
      price: Number(product.attributes.price),
      totalPrice: Number(product.attributes.price) * amount,
      selectedColors,
    };
    dispatch(addToCart(newItem));
  }

  useEffect(
    function () {
      document.title = `Comfy store | ${name}`;
      // localStorage.setItem("cart", JSON.stringify(cart));

      return function () {
        document.title = `${"Comfy store"}`;
      };
    },
    [name, cart]
  );
  if (isLoading) return <Spinner />;

  return (
    <div className="flex flex-col gap-10 standard:flex-row w-full">
      <div className="w-full">
        <img
          src={product.attributes.image}
          className="h-[500px] standard:h-[400px] w-full standard:w-[500px] rounded-lg "
        />
      </div>
      <div
        className={`w-full flex flex-col gap-4 ${
          theme === "light" ? "text-black" : "text-white"
        }`}
      >
        <h1 className="text-4xl font-extrabold">{product.attributes.title}</h1>
        <h2 className="text-xl font-bold">{product.attributes.company}</h2>
        <h3 className="text-xl">{formatCurrency(product.attributes.price)}</h3>
        <p className="flex flex-wrap  leading-8 mb-4">
          {product.attributes.description}
        </p>
        <div>Colors</div>
        <div className="">
          <ul className="flex flex-row gap-3">
            {product.attributes.colors.map((color) => (
              <li key={color}>
                <button
                  style={{ backgroundColor: color }}
                  className={`h-6 w-6 rounded-full hover:cursor-pointer focus:outline-none focus:border-gray-300 focus:border-2 ${
                    selectedColors.includes(color)
                      ? "border-2 border-black"
                      : ""
                  }`}
                  onClick={() => dispatch(toggleColor(color))}
                ></button>
              </li>
            ))}
          </ul>
        </div>

        <form className="">
          <label
            htmlFor="counter-input"
            className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
          >
            Choose quantity:
          </label>
          <div className="relative flex items-center">
            <button
              type="button"
              id="decrement-button"
              onClick={() => setAmount(amount - 1)}
              data-input-counter-decrement="counter-input"
              className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
            >
              <FiMinus />
            </button>
            <input
              type="text"
              id="counter-input"
              className="flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
              placeholder=""
              value={amount}
              readOnly
            />
            <button
              type="button"
              id="increment-button"
              onClick={() => setAmount(amount + 1)}
              data-input-counter-increment="counter-input"
              className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
            >
              <FiPlus />
            </button>
          </div>
        </form>
        <button
          className="btn btn-success text-white"
          onClick={handleClick}
          disabled={truth}
        >
          {truth ? "Its in the cart" : "Add to cart"}
        </button>
      </div>
    </div>
  );
}

export default Details;
