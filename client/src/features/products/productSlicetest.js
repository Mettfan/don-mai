import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const productSlicetest = createSlice({
    name: 'productos',
    initialState: {
        loading: false,
        products: [],
        selectedProduct: {},
        productSelectedCounter: 0,
        error: ''
    },
    reducers: {
        nextProduct: (state) => {
            state.productSelectedCounter += 1
            console.log("Next!");
        },
        previousProduct: (state) => {
            state.productSelectedCounter -= 1
            console.log("Previous!");
        }
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

        builder.addCase(fetchProduct.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            state.loading = false
            state.selectedProduct = {...action.payload, selected: false, quantity: 0}
            state.error = ''
        })
        builder.addCase(fetchProduct.rejected, (state, action) => {
            state.loading = false
            state.selectedProduct = {}
            state.error = action.error.message
        })


    }
})

const fetchProducts = createAsyncThunk('products/fetchProducts', () => {
    return axios.get('http://localhost:3001/products')
    .then( response => response.data.db)
})
const fetchProduct = createAsyncThunk('products/fetchProduct', ({filter, value}) => {
    console.log(value);
    return axios.get(`http://localhost:3001/products/?filter=${filter}&value=${value}`)
    .then( response => response.data)
})
export const { nextProduct, previousProduct } = productSlicetest.actions
export const productSliceReducer = productSlicetest.reducer
export const fetchAllProducts = fetchProducts
export const fetchOneProduct = fetchProduct
