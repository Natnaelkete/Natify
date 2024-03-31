import { Link } from "react-router-dom";
import { useTheme } from "../../ui/useThemetoggler";
import hero1 from "../../assets/images/hero2.webp";
import hero2 from "../../assets/images/hero2.webp";
function Hero() {
  const { theme } = useTheme();

  return (
    <div
      className={`grid w-full  grid-cols-1 my-auto mt-4 grid-warp  standard:grid-cols-2 ${
        theme === "dark" ? "text-white" : ""
      }`}
    >
      <div className="flex flex-col mb-[150px] justify-center col-span-1 text-center lg:text-start">
        <h1 className="mb-8 text-4xl font-extrabold leading-tight lg:text-6xl ">
          We’re changing the way people shop.
        </h1>
        <p className="mb-6 text-base font-inter font-normal leading-7 lg:w-3/4 ">
          Transform your furniture shopping experience with our cutting-edge
          e-commerce web app. Bid farewell to the days of painstakingly crafting
          templates from the ground up. Embrace the unparalleled speed,
          responsiveness, and modern design of our dashboard solution. Your
          journey to effortlessly discovering and acquiring the perfect
          furniture pieces begins here.
        </p>

        <div className="flex flex-col items-center gap-4 lg:flex-row">
          <Link to="/product">
            <button
              className="flex items-center font-inter py-4 text-md font-bold text-white px-7 bg-success
          hover:bg-[green] focus:ring-4 focus:ring-purple-blue-100 transition duration-300 rounded-xl"
            >
              Our Product
            </button>
          </Link>
        </div>
      </div>
      <div className="items-center justify-end hidden col-span-1 standard:flex">
        <div className="flex relative">
          <img
            className="w-[500px] mr-20   border-r-4 border-b-4 border-success rounded-md z-10 shadow-xl h-[500px] mb-[100px] "
            src={hero1}
            alt="header image"
          />
          <img
            className="w-[80%] blur-sm ml-[80px] rounded-md absolute m-8 h-[500px] mr-14  mb-[100px]"
            src={hero2}
            alt="header image"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
