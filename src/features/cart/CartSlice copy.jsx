import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialStates = {
  cart: [],
  amount: 1,
  colors: [],
};
// function getItemsFormLocalStorage() {
//   return JSON.parse(localStorage.getItem("cart")) || initialStates;
// }

const CartSlice = createSlice({
  name: "cart",
  initialState: initialStates,
  reducers: {
    addToCart(state, action) {
      state.cart.push(action.payload);
      // localStorage.setItem("cart", JSON.stringify(state));
      toast.success("Item add successfully");
    },
    Incrementing(state) {
      state.amount = Math.max(1, state.amount + 1);
    },

    Decrementing(state) {
      state.amount = Math.max(1, state.amount - 1);
    },
    // increaseItemQuantity(state, action) {
    //   const itemIndex = state.cart.find(
    //     (item) => item.productId === action.payload
    //   );

    //   itemIndex.quantity++;
    //   itemIndex.price = itemIndex.price * state.quantity;
    // },
    increaseItemQuantity(state, action) {
      const itemIndex = state.cart.find(
        (item) => item.productId === action.payload
      );

      if (itemIndex) {
        // Increase the quantity
        itemIndex.quantity = Math.max(1, itemIndex.quantity + 1);

        // Update the price based on the new quantity
        itemIndex.price = itemIndex.price * itemIndex.quantity;
      }
    },
    decreaseItemQuantity(state, action) {
      const itemIndex = state.cart.find(
        (item) => item.productId === action.payload
      );

      if (itemIndex) {
        // Increase the quantity
        itemIndex.quantity = Math.max(1, itemIndex.quantity - 1);

        // Update the price based on the new quantity
        itemIndex.price = itemIndex.price / itemIndex.quantity;
      }
    },

    toggleColor(state, action) {
      const colorIndex = state.colors.indexOf(action.payload);
      if (colorIndex !== -1) {
        state.colors.splice(colorIndex, 1);
      } else {
        state.colors.push(action.payload);
      }
    },
    updateCartItem(state, action) {
      state.cart = state.cart.map((item) =>
        item.quantity === action.payload
          ? { ...state.cart, quantity: action.payload }
          : item
      );
    },
    deleteCartItem(state, action) {
      state.cart = state.cart.filter(
        (item) => item.productId !== action.payload
      );
    },
    clearAmount(state) {
      state.amount = 1;
    },
    clearColors(state) {
      state.colors = [];
    },
  },
});

export const {
  addToCart,
  Incrementing,
  Decrementing,
  toggleColor,
  clearAmount,
  clearColors,
  deleteCartItem,
  decreaseItemQuantity,
  increaseItemQuantity,
} = CartSlice.actions;
export default CartSlice.reducer;
