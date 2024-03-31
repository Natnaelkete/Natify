import { Link } from "react-router-dom";
import useProduct from "../../Utility/useProduct";
import Card from "../../ui/Card";
import Spinner from "../../ui/Spinner";

function Feature() {
  const { isLoading, productData } = useProduct("products");

  if (isLoading) return <Spinner />;

  const limitedProductData = productData.slice(1, 4);

  return (
    <div>
      <section className="z-40 relative ">
        <div className="mx-auto">
          <h2 className="text-3xl font-light sm:text-4xl lg:text-5xl">
            Our
            <span className="block w-full font-light text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-500 lg:inline">
              {" "}
              Products
            </span>{" "}
          </h2>
          <p className="mb-20 text-lg ">
            Comes directly from the desk of engineers, creators and managers at
          </p>
          <hr className="my-10 border-gray-200 dark:border-gray-700" />

          <div className=" ">
            <ul className="grid grid-cols-1 md:grid-cols-2 standard:grid-cols-3 gap-14">
              {limitedProductData.map((item) => (
                <li key={item.id} className=" ">
                  <Link to={`product/${item.id}?name=${item.attributes.title}`}>
                    <Card
                      title={item.attributes.title}
                      price={item.attributes.price}
                      image={item.attributes.image}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Feature;
