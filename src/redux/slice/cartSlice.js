import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
      value: [],
    },
    reducers: {
      addToCart: (state, action) => {
        state.value.push(action.payload)
      },
      deleteFromCart: (state, action) => {
        const idx = state.value.findIndex((product) => product.id !== action.payload.id)
        state.value.splice(idx, 1)
      }
    },
  });
  
  export const {addToCart, deleteFromCart} = cartSlice.actions;
  
  export default cartSlice.reducer;
  