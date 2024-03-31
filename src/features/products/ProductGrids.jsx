import { Link } from "react-router-dom";
import Card from "../../ui/Card";
// import useProduct from "../../Utility/useProduct";

function ProductGrid({ productData }) {
  const dataFiles = productData.data;

  return (
    <div>
      <ul className="grid grid-cols-1 standard:grid-cols-3 gap-4">
        {dataFiles.map((item) => (
          <li key={item.id}>
            <Link to={`${item.id}?name=${item.attributes.title}`}>
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
  );
}

export default ProductGrid;
