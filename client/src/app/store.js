import { configureStore } from '@reduxjs/toolkit';
import {productSlicetest} from '../features/products/productSlicetest'
import counterReducer from '../Components/counter/counterSlice';
import { userSlice } from '../features/users/userSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    products: productSlicetest.reducer,
    users: userSlice.reducer
  },
});
