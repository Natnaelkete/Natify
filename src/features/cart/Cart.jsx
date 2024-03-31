import { FiMinus, FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseItemQuantity,
  deleteCartItem,
  getTotalCartPrice,
  increaseItemQuantity,
} from "../cart/CartSlice";
import { formatCurrency } from "../../Utility/helpers";
import { useNavigate } from "react-router-dom";

function Cart() {
  // const [cart, setCart] = useState([]);

  // useEffect(() => {
  //   const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
  //   setCart(savedCart);
  // }, []);
  // function deleteCartItemFromLocalStorage(itemId) {
  //   const updatedCart = cart.filter(item => item.productId !== itemId);
  //   localStorage.setItem("cart", JSON.stringify(updatedCart));
  //   setCart(updatedCart);
  // }

  const cart = useSelector((state) => state.cart.cart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const isAuthenticated = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const shippingPrice = 5;
  const tax = formatCurrency((totalCartPrice * 10) / 100);

  const totalPrice = totalCartPrice + shippingPrice;

  function handleClick() {
    if (isAuthenticated) return navigate("/checkout");
    navigate("/login");
  }

  return (
    <div>
      <h1 className="text-3xl font-inter font-bold">Your Shopping Cart</h1>
      <hr className="my-10 border-gray-200 dark:border-gray-700" />
      <div className=" flex flex-col standard:flex-row justify-between">
        {cart.length > 0 ? (
          <ul className="flex flex-col gap-14">
            {cart.map((item) => (
              <>
                <li key={item.productId}>
                  <div className=" flex gap-20 flex-col md:flex-row  justify-between ">
                    <img
                      src={item.productImage}
                      className="rounded-lg w-full h-[200px] sm:h-[250px] md:h-[150px] md:w-[170px]"
                    />
                    <div className="mr-8 flex flex-col gap-4">
                      <h3>{item.name}</h3>
                      <h4>{item.company}</h4>
                      <div>
                        <h4>color</h4>
                        <ul className="flex flex-row gap-2">
                          {item.selectedColors.map((color) => (
                            <li key={color}>
                              <button
                                style={{ backgroundColor: color }}
                                className={`h-6 w-6 rounded-full border-2 border-gray-400 hover:cursor-pointer focus:outline-none focus:border-gray-300 focus:border-2`}
                              ></button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="flex flex-col  gap-4">
                      <h3 className="place-items-center">Amount</h3>
                      <div className="">
                        <form className="flex flex-col justify-center ">
                          <div className="relative flex items-center">
                            <button
                              type="button"
                              id="decrement-button"
                              onClick={() =>
                                dispatch(decreaseItemQuantity(item.productId))
                              }
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
                              value={item.quantity}
                              readOnly
                            />
                            <button
                              type="button"
                              id="increment-button"
                              onClick={() =>
                                dispatch(increaseItemQuantity(item.productId))
                              }
                              data-input-counter-increment="counter-input"
                              className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                            >
                              <FiPlus />
                            </button>
                          </div>
                        </form>
                        <button
                          onClick={() =>
                            dispatch(deleteCartItem(item.productId))
                          }
                          className="text-red-500 hover:underline"
                        >
                          remove
                        </button>
                      </div>
                    </div>
                    <div>
                      <h3>{formatCurrency(item.price)}</h3>
                    </div>
                  </div>
                </li>
                <hr className="my-2 border-gray-200 dark:border-gray-700" />
              </>
            ))}
          </ul>
        ) : (
          <h2>There is no item in the cart</h2>
        )}
        <hr className="my-10 border-gray-200 dark:border-gray-700" />
        <div className="ml-7 ">
          <div className=" md:w-[300px] flex flex-col gap-2 text-sm  font-inter bg-black bg-opacity-5 p-5 rounded-lg">
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
          <button
            onClick={handleClick}
            className="btn w-full text-white btn-success mt-10"
          >
            {isAuthenticated ? "Proceed to checkout" : "Please Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
