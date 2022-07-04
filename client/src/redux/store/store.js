import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../reducers/productReducer';
import product from '../slices/products/product';
export const store = configureStore({
  reducer: {
    product
  }
})

export default store;
