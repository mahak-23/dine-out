import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { totalItems: 0, cartItems: {} },
  reducers: {
    addItemToCart: (state, action) => {

      const { id } = action.payload;
      state.totalItems += 1;

      if (state.cartItems[id]) {
        state.cartItems[id].quantity += 1;
      } else {
        state.cartItems[id] = { item: action.payload, quantity: 1 };
      }
    },
    removeItemFromCart: (state, action) => {
      const { id } = action.payload;
      state.totalItems = state.totalItems === 1 ? 0 : state.totalItems - 1;

      if (state.cartItems[id].quantity > 1) {
        state.cartItems[id].quantity -= 1;
      } else {
        delete state.cartItems[id];
      }
    },
    clearCart: (state, action) => {
      state.cartItems = {};
      state.totalItems = 0;
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
