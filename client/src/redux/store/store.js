import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../reducers/productReducer';

export const store = configureStore({
  reducer: {
    products:  productReducer
  }
})

export default store;
