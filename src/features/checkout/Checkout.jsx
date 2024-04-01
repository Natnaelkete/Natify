import { formatCurrency } from "../../Utility/helpers";
import { useDispatch, useSelector } from "react-redux";
import { getTotalCartPrice } from "../cart/CartSlice";
import { useTheme } from "../../ui/useThemetoggler";
import { MdLocationPin } from "react-icons/md";

import { fetchAddress, getInfo } from "./checkoutSlice";
import { Form, useNavigate } from "react-router-dom";

function Checkout() {
  const { dark } = useTheme();
  const totalCartPrice = useSelector(getTotalCartPrice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isLoggedIn);

  const shippingPrice = 5;
  const tax = formatCurrency((totalCartPrice * 10) / 100);

  const totalPrice = totalCartPrice + shippingPrice;

  const { address } = useSelector((state) => state.checkout);
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const info = {
      fullname: formData.get("fullname"),
      address: formData.get("address"),
    };

    dispatch(getInfo(info));

    navigate("/orders");
  }
  if (!isAuthenticated) return navigate("/");
  return (
    <div>
      <h1 className="text-3xl font-inter font-bold">Place your order</h1>
      <hr className="my-10 border-gray-200 dark:border-gray-700" />
      <div className=" flex flex-col standard:flex-row justify-between">
        <Form
          onSubmit={handleSubmit}
          method="POST"
          className="flex flex-col gap-10 w-full standard:w-[50%]"
        >
          <h1>Shipping info</h1>
          <label className="form-control  ">
            <div className="label">
              <span className="label-text text-[16px]">First name</span>
            </div>
            <input
              type="text"
              id="fullname"
              name="fullname"
              className="input input-bordered "
            />
          </label>
          <div>
            <h2>Address</h2>
            <label className="input input-bordered flex items-center gap-2 mt-1">
              <input
                type="text"
                id="address"
                name="address"
                className="grow border w-full border-none"
                defaultValue={address}
              />

              <button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
                className="kbd kbd-md  cursor-pointer"
              >
                <MdLocationPin />
              </button>
            </label>
          </div>
          <button
            type="submit"
            className="btn w-full text-white btn-success mt-10"
          >
            Order
          </button>
        </Form>
        <hr className="my-10 border-gray-200 dark:border-gray-700" />

        <div className={`standard:ml-7 w-full standard:w-[50%] `}>
          <div
            className={` md:w-full flex flex-col gap-2 text-sm  font-inter ${
              dark ? "dark:bg-gray-900 " : "bg-slate-600 "
            } bg-opacity-5 p-5 rounded-lg`}
          >
            <div className="flex flex-row justify-between">
              <h3>Subtotal</h3>
              <div>{formatCurrency(totalCartPrice)}</div>
            </div>

            <div className="flex  flex-row justify-between">
              <h3>Shipping</h3>
              <div>{formatCurrency(shippingPrice)}</div>
            </div>

            <div className="flex flex-row justify-between">
              <h3>Tax</h3>
              <div>{tax}</div>
            </div>

            <div className="flex flex-row justify-between mt-10">
              <h3>Order total</h3>
              <div>{formatCurrency(totalPrice)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
