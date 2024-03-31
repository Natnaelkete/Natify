import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../services/apiProducts";

function useGetProductByIds(id) {
  const { isLoading, data: product } = useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductById(id),
  });

  return { isLoading, product };
}

export default useGetProductByIds;
