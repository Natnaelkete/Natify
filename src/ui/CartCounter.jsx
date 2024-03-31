import { HiOutlineShoppingCart } from "react-icons/hi";
import { useTheme } from "./useThemetoggler";
import { useSelector } from "react-redux";
import { formatCurrency } from "../Utility/helpers";
import { Link } from "react-router-dom";

function CartCounter() {
  const cart = useSelector((state) => state.cart.cart);
  const cartNum = cart.length;

  const totalCartPrice = cart.reduce((sum, item) => {
    return sum + item.price;
  }, 0);

  const { theme } = useTheme();
  return (
    <span>
      <div
        className={`flex-none   ${
          theme === "light" ? "hover:text-[green]" : "hover:text-white"
        }`}
      >
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator ">
              <HiOutlineShoppingCart className="   size-6" />

              <span className="badge badge-xs badge-success text-white indicator-item">
                {cartNum}
              </span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="mt-3  z-50 card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <span className="font-bold text-lg">{cartNum} Items</span>
              <span className="text-info">
                Subtotal: {formatCurrency(totalCartPrice)}
              </span>
              <div className="card-actions">
                <Link to="/cart" className="btn btn-success btn-block">
                  View cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </span>
  );
}

export default CartCounter;
