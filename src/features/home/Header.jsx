import { NavLink } from "react-router-dom";
import { navLinks } from "../../Utility/Cms";
import CartCounter from "../../ui/CartCounter";
import { IoMoon } from "react-icons/io5";
import { MdOutlineWbSunny } from "react-icons/md";
import { useTheme } from "../../ui/useThemetoggler";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Avatar from "../../ui/Avatar";
import Drawer from "../../ui/Drawer";

function Header() {
  const { handleClick, theme } = useTheme();
  const isAuthenticated = useSelector((state) => state.user.isLoggedIn);

  return (
    <div
      className={`navbar fixed font-inter  z-50 backdrop-blur backdrop-filter bg-opacity-60 bg-base-200 sm:px-10 standard:px-20 ${
        theme === "dark" ? "text-white" : ""
      }`}
    >
      <div className="navbar-start">
        <Drawer />
        <Link
          to="/"
          className={` bg-none hover:bg-none font-extrabold text-xl lg:flex hidden sm:flex `}
        >
          NATIFY
        </Link>
      </div>
      <div className="navbar-center hidden  standard:flex">
        <ul className="flex flex-col p-4 standard:p-0 mt-4   font-medium border rounded-lg 0 standard:space-x-8 rtl:space-x-reverse standard:flex-row standard:mt-0 standard:border-0  ">
          {navLinks.map((links, index) => {
            if (
              (links.href === "/checkout" || links.href === "/orders") &&
              !isAuthenticated
            )
              return null;
            return (
              <li
                key={index}
                className={`block standard:py-2  font-inter font-[400] standard:px-3   btn-ghost  rounded  standard:p-0 ${
                  theme === "light" ? "hover:text-[green]" : "hover:text-white"
                }`}
              >
                <NavLink
                  className={`${
                    !isAuthenticated && links.label === "checkout" && "hidden"
                  }`}
                  to={links.href}
                >
                  {links.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="navbar-end">
        {isAuthenticated ? (
          <Avatar />
        ) : (
          <Link to="/register">
            <button className="btn text-white font-inter btn-success mr-3 hidden standard:flex ">
              Sign up
            </button>
          </Link>
        )}
        <button
          className={`btn btn-ghost btn-circle  ${
            theme === "light" ? "hover:text-[green]" : "hover:text-white"
          }`}
        >
          <button onClick={handleClick} className="items-center">
            {theme !== "light" ? (
              <MdOutlineWbSunny className=" size-6  max-sm:size-5 " />
            ) : (
              <IoMoon className=" size-6  max-sm:size-5 " />
            )}
          </button>
        </button>
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <CartCounter />
          </div>
        </button>
      </div>
    </div>
  );
}

export default Header;
