import { createReducer } from "@reduxjs/toolkit"

export const cartReducer = createReducer([], (builder) => {
  builder
    .addCase('ADD_TO_CART', (state, action) => {
      // "mutate" the array by calling push()
      state.push(action.payload)
    })
})