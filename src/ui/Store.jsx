import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/CartSlice";
import userReducer from "../features/authentication/userSlice";
import checkoutReducer from "../features/checkout/checkoutSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    checkout: checkoutReducer,
  },
});

export default store;
