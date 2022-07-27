import { configureStore } from '@reduxjs/toolkit';
import {productSlicetest} from '../features/products/productSlicetest'
import counterReducer from '../Components/counter/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    products: productSlicetest.reducer
  },
});
