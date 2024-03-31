import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  HomeLayout,
  Landing,
  Error,
  Products,
  SingleProduct,
  AboutPage,
  Register,
  Login,
  Checkout,
  Orders,
} from "./Pages/index";

import { action as createUser } from "./features/authentication/Registers";

import { ThemeProvider } from "./ui/useThemetoggler";

import Details from "./features/products/Details";
import { ProductProvider } from "./features/products/productProvider";
import Carts from "./Pages/Cart";
import { SelectorProvider } from "./features/products/SelectorProvidor";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <SelectorProvider>
        <ProductProvider>
          <ThemeProvider>
            <HomeLayout />
          </ThemeProvider>
        </ProductProvider>
      </SelectorProvider>
    ),
    errorElement: <Error />,
    children: [
      { index: true, element: <Landing /> },
      { path: "/about", element: <AboutPage /> },
      { path: "cart", element: <Carts /> },
      { path: "/product", element: <Products /> },
      { path: "/product/:productId", element: <Details /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/orders", element: <Orders /> },
      {
        path: "/singleproduct",
        element: <SingleProduct />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <ThemeProvider>
        <Login />
      </ThemeProvider>
    ),

    errorElement: <Error />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />,
    action: createUser,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
