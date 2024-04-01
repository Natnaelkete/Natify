import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { navLinks } from "../Utility/Cms";
import { Link, NavLink } from "react-router-dom";

function Drawer() {
  const isAuthenticated = useSelector((state) => state.user.isLoggedIn);

  return (
    <div className="z-10">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div>
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <GiHamburgerMenu className="w-5 h-5" />
            </label>
          </div>
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul
          tabIndex={0}
          className="menu p-4  flex gap-2 w-80 min-h-full bg-base-200"
        >
          <div className="flex justify-end">
            <label
              htmlFor="my-drawer-3"
              aria-label="close sidebar"
              className="btn btn-square btn-ghost "
            >
              <IoMdClose className="w-5 h-5" />
            </label>
          </div>
          {navLinks.map((links, index) => {
            if (
              (links.href === "/checkout" || links.href === "/orders") &&
              !isAuthenticated
            )
              return null;

            return (
              <li key={index}>
                <NavLink to={links.href}>{links.label}</NavLink>
              </li>
            );
          })}
          {!isAuthenticated && (
            <Link to="/register">
              <button className="btn mt-10 text-white font-inter btn-success w-full btn-md standard:flex ">
                Sign up
              </button>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Drawer;
