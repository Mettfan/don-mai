import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
let cookie = new Cookies()
export const sucursalSlice = createSlice({
    name: 'sucursales',
    initialState: {
        loading: false,
        sucursal: {},
        counter: 0,
        response: '',
        error: ''
    },
    reducers: {
        
        setCounter: (state, action) => {
            state.counter = action.payload
        },
        
    },
    extraReducers: builder => {
        // builder.addCase(fetchProducts.pending, state => {
        //     state.loading = true
        // })
        // builder.addCase(fetchProducts.fulfilled, (state, action) => {
        //     state.loading = false
        //     state.products = action.payload
        //     state.error = ''
        // })
        // builder.addCase(fetchProducts.rejected, (state, action) => {
        //     state.loading = false
        //     state.products = []
        //     state.error = action.error.message
        // })
//////////////////////////////
        // builder.addCase(fetchSucursal.pending, state => {
        //     state.loading = true
        // })
        // builder.addCase(fetchSucursal.fulfilled, (state, action) => {
        //     cookie.set('sucursal', action.payload)
        //     state.loading = false
        //     state.sucursal = {...action.payload}
        //     state.error = ''
        // })
        // builder.addCase(fetchSucursal.rejected, (state, action) => {
        //     state.loading = false
        //     state.sucursal = {}
        //     state.error = action.error.message
        // })
////////////////////////////
        // builder.addCase(editProduct.pending, state => {
        //     state.loading = true
        // })
        // builder.addCase(editProduct.fulfilled, (state, action) => {
        //     state.loading = false
        //     state.response = action.payload
        //     state.error = ''
        // })
        // builder.addCase(editProduct.rejected, (state, action) => {
        //     state.loading = false
        //     state.error = action.error.message
        //     state.response = null
        // })
        //////////////////////////
        builder.addCase(createSucursal.pending, state => {
            state.loading = true
        })
        builder.addCase(createSucursal.fulfilled, (state, action) => {
            state.loading = false
            state.response = action.payload
            state.error = ''
        })
        builder.addCase(createSucursal.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
            state.response = null
        })
        ///////////////
        builder.addCase(associateSucursalToUser.pending, state => {
            state.loading = true
        })
        builder.addCase(associateSucursalToUser.fulfilled, (state, action) => {
            state.loading = false
            state.response = action.payload
            state.error = ''
        })
        builder.addCase(associateSucursalToUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
            state.response = null
        })
    



    }
})

const createSucursal = createAsyncThunk('sucursales/createSucursal', ({sucursal}) => {
    return axios.post('http://localhost:3001/sucursales', {sucursal: sucursal})
    .then( response => response.data.db)
})
const associateSucursalToUser = createAsyncThunk('sucursales/associateSucursalToUser', ({userId, sucursalId}) => {
    return axios.post('http://localhost:3001/sucursales/add/user', {userId, sucursalId})
    .then( response => response.data)
})
// const fetchSucursal = createAsyncThunk('users/fetchSucursal', ({filter, value, password}) => {
//     console.log(value);
//     return axios.get(`http://localhost:3001/sucursales/?filter=${filter}&value=${value}&password=${password}`)
//     .then( response => response.data)
// })
// const editProduct = createAsyncThunk('products/editProduct', ({id, findBy, infoUpdated}) => {
//     // console.log(value);
//     return axios.put(`http://localhost:3001/products/update`, {
//         id,
//         findBy,
//         infoUpdated
//     })
//     .then( response => response.data)
// })
export const { 
    setCounter

} = sucursalSlice.actions
// export const productSliceReducer = productSlicetest.reducer
export const createOneSucursal = createSucursal
export const associateOneSucursalToUser = associateSucursalToUser
// export const fetchOneSucursal = fetchSucursal //
// export const editOneProduct = editProduct
