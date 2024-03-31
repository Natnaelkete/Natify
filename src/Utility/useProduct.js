import { useQuery } from "@tanstack/react-query";
import { GetProduct } from "../services/apiProducts";

function useProduct(path) {
  const { isLoading, data: productData } = useQuery({
    queryKey: ["products", path], // unique identifier for this request (prod
    queryFn: () => GetProduct(path),
    onError: () => {
      alert("Failed to load products");
    },
  });

  return { isLoading, productData };
}

export default useProduct;
