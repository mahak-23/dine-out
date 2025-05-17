// src/redux/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage if it exists
const loadCartFromLocalStorageInit = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : { totalItems: 0, cartItems: {} };
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromLocalStorageInit(),
  reducers: {
    addItemToCart: (state, action) => {
      const { id } = action.payload;
      state.totalItems += 1;

      if (state.cartItems[id]) {
        state.cartItems[id].quantity += 1;
      } else {
        state.cartItems[id] = { item: action.payload, quantity: 1 };
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeItemFromCart: (state, action) => {
      const { id } = action.payload;
      state.totalItems = state.totalItems === 1 ? 0 : state.totalItems - 1;

      if (state.cartItems[id].quantity > 1) {
        state.cartItems[id].quantity -= 1;
      } else {
        delete state.cartItems[id];
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCart: (state) => {
      state.cartItems = {};
      state.totalItems = 0;
      localStorage.removeItem("cart");
    },
    loadCartFromLocalStorage: (state) => {
      const storedCart = loadCartFromLocalStorage();
      state.totalItems = storedCart.totalItems;
      state.cartItems = storedCart.cartItems;
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  clearCart,
  loadCartFromLocalStorage,
} = cartSlice.actions;
export default cartSlice.reducer;
