import { formatCurrency } from "../Utility/helpers";
import { useTheme } from "./useThemetoggler";

function Card({ title, price, image }) {
  const { theme } = useTheme();

  return (
    <div className="w-full place-items-center max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 hover:scale-105 hover:shadow-2xl transition-none duration-300">
      <a href="#">
        <img
          className="h-[250px]   w-full rounded-t-lg"
          src={image}
          alt="product image"
        />
      </a>

      <div
        className={`px-5 pb-5 text:lg text-center flex flex-col p-6 gap-3 items-center justify-center ${
          theme === "dark" ? "text-gray-800" : "bg-white"
        }`}
      >
        <a href="#">
          <h5
            className={`text-center text-xl standard:text-3xl font-bold tracking-tight  ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            {title}
          </h5>
        </a>

        <div className="flex items-center justify-between">
          <span
            className={` text-xl  font-semibold ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {formatCurrency(price)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;
