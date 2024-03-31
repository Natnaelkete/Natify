import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cart: [],
  colors: [],
};

function getItemsFormLocalStorage() {
  return JSON.parse(localStorage.getItem("cart")) || initialState;
}

const CartSlice = createSlice({
  name: "cart",
  initialState: getItemsFormLocalStorage(),
  reducers: {
    addToCart(state, action) {
      state.cart.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state));
      toast.success("Item added successfully");
    },
    deleteCartItem(state, action) {
      const deletedProductId = action.payload;
      state.cart = state.cart.filter(
        (item) => item.productId !== deletedProductId
      );
      toast.error("Item removed successfully");

      // Dispatch deleteItemFromLocalStorage action to delete item from localStorage
      CartSlice.caseReducers.deleteItemFromLocalStorage(state, {
        payload: deletedProductId,
      });
    },
    // Other reducers...
    deleteItemFromLocalStorage(state, action) {
      const deletedProductId = action.payload;
      const updatedCart = state.cart.filter(
        (item) => item.productId !== deletedProductId
      );
      localStorage.setItem(
        "cart",
        JSON.stringify({ cart: updatedCart, colors: state.colors })
      );
      state.cart = updatedCart;
    },
    increaseItemQuantity(state, action) {
      const itemIndex = state.cart.find(
        (item) => item.productId === action.payload
      );

      itemIndex.quantity++;
      itemIndex.totalPrice = itemIndex.quantity * itemIndex.price;
      toast.success("Item quantity updated");
    },
    decreaseItemQuantity(state, action) {
      const itemIndex = state.cart.find(
        (item) => item.productId === action.payload
      );

      itemIndex.quantity--;
      itemIndex.totalPrice = itemIndex.quantity * itemIndex.price;
      toast.success("Item quantity updated");
      if (itemIndex.quantity === 0)
        CartSlice.caseReducers.deleteItem(state, action);
    },
    Incrementing(state) {
      state.cart.quantity = Math.max(1, state.cart.quantity + 1);
    },

    Decrementing(state, action) {
      const itemIndex = state.cart.find(
        (item) => item.productId === action.payload
      );
      if (itemIndex) {
        itemIndex.quantity = Math.max(1, itemIndex.quantity - 1);
        if (itemIndex.quantity === 0) {
          state.cart = state.cart.filter(
            (item) => item.productId !== action.payload
          );
        }
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
    clearCart(state) {
      state.cart = [];
      state.colors = [];
    },
  },
});

export const {
  Incrementing,
  Decrementing,
  addToCart,
  toggleColor,
  clearCart,
  deleteCartItem,
  decreaseItemQuantity,
  increaseItemQuantity,
} = CartSlice.actions;

export default CartSlice.reducer;

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.productId === id)?.quantity ?? 0;
