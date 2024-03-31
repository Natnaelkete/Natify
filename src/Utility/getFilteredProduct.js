import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../services/apiProducts";

function useGetFilteredProduct(searchParams) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["products", searchParams],
    queryFn: () => fetchProducts(searchParams),
  });

  return { isLoading, data, error };
}

export default useGetFilteredProduct;
