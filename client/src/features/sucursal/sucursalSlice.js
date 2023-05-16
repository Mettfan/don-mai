import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
let cookie = new Cookies()
export const sucursalSlice = createSlice({
    name: 'sucursales',
    initialState: {
        loading: false,
        sucursal: {},
        sucursalProducts: [],
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
        builder.addCase(fetchSucursal.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchSucursal.fulfilled, (state, action) => {
            state.loading = false
            state.sucursal = {...action.payload}
            state.error = ''
        })
        builder.addCase(fetchSucursal.rejected, (state, action) => {
            state.loading = false
            state.sucursal = {}
            state.error = action.error.message
        })
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
        ///////////////
        builder.addCase(associateProductToSucursal.pending, state => {
            state.loading = true
        })
        builder.addCase(associateProductToSucursal.fulfilled, (state, action) => {
            state.loading = false
            state.response = action.payload
            state.error = ''
        })
        builder.addCase(associateProductToSucursal.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
            state.response = null
        })
        ///////////////
        builder.addCase(getSucursalProducts.pending, state => {
            state.loading = true
        })
        builder.addCase(getSucursalProducts.fulfilled, (state, action) => {
            state.loading = false
            state.sucursalProducts = action.payload
            state.error = ''
        })
        builder.addCase(getSucursalProducts.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
            state.response = null
        })
        ///////////////
        builder.addCase(deleteSucursalProduct.pending, (state, action) => {
            state.loading = true
            state.sucursalProducts = action.payload
        })
        builder.addCase(deleteSucursalProduct.fulfilled, (state, action) => {
            state.loading = false
            state.response = action.payload
            state.error = ''
        })
        builder.addCase(deleteSucursalProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
            state.response = null
        })
        
        
        
    }
})

const createSucursal = createAsyncThunk('sucursales/createSucursal', ({sucursal, userId}) => {
    return axios.post('http://localhost:3001/sucursales', {sucursal: sucursal, userId: userId})
    .then( response => response.data)
})
const associateSucursalToUser = createAsyncThunk('sucursales/associateSucursalToUser', ({userId, sucursalId}) => {
    return axios.post('http://localhost:3001/sucursales/add/user', {userId, sucursalId})
    .then( response => response.data)
})
const fetchSucursal = createAsyncThunk('sucursales/fetchSucursal', ({filter, value}) => {
    console.log(value);
    return axios.get(`http://localhost:3001/sucursales/?filter=${filter}&value=${value}`)
    .then( response => response.data)
})

const associateProductToSucursal = createAsyncThunk('sucursales/associateProductToSucursal', ({sucursalId, productId}) => {
    return axios.post(`http://localhost:3001/sucursales/add/product`, {
        sucursalId,
        productId
    })
    .then( response => response.data)
})
const getSucursalProducts = createAsyncThunk('sucursales/getSucursalProducts', ({sucursalId}) => {
    return axios.get(`http://localhost:3001/sucursales/get/product/?sucursalId=${sucursalId}`)
    .then( response => response.data)
})
const deleteSucursalProduct = createAsyncThunk('sucursales/deleteSucursalProduct', ({sucursalId, productId}) => {
    return axios.delete(`http://localhost:3001/sucursales/delete/product/?sucursalId=${sucursalId}&productId=${productId}`)
    .then( response => response.data)
})

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
export const fetchOneSucursal = fetchSucursal //
export const exhibirProducto = associateProductToSucursal 
export const getProductosExhibidos = getSucursalProducts 
export const quitarExhibicion = deleteSucursalProduct 
// export const editOneProduct = editProduct

