const API_URL = "https://strapi-store-server.onrender.com/api";

export async function GetProduct(path) {
  const res = await fetch(`${API_URL}/${path}`);

  if (!res.ok) throw Error("Failed to getting Product");
  const { data } = await res.json();
  return data;
}

export function fetchProducts(searchParams) {
  const queryString = new URLSearchParams(searchParams).toString();
  return fetch(
    `https://strapi-store-server.onrender.com/api/products?${queryString}`
  ).then((res) => res.json());
}

export async function getProductById(id) {
  const res = await fetch(`${API_URL}/products/${id}`);

  if (!res.ok) throw Error(`Could not find the  product}`);
  const { data } = await res.json();

  return data;
}
