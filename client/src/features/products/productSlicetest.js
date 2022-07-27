import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const productSlicetest = createSlice({
    name: 'productos',
    initialState: {
        loading: false,
        products: [],
        error: ''
    },
    extraReducers: builder => {
        builder.addCase(fetchProducts.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false
            state.products = action.payload
            state.error = ''
        })
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false
            state.products = []
            state.error = action.error.message
        })


    }
})

const fetchProducts = createAsyncThunk('products/fetchProducts', () => {
    return axios.get('http://localhost:3001/products')
    .then( response => response.data.db)
})

export const productSliceReducer = productSlicetest.reducer
export const fetchAllProducts = fetchProducts