import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const productSlicetest = createSlice({
    name: 'productos',
    initialState: {
        loading: false,
        products: [],
        selectedProduct: {},
        productSelectedCounter: 0,
        ticketProducts: [],
        totalTicket: 0,
        counterId: 0,
        response: '',
        error: ''
    },
    reducers: {
        counterIncrement: (state) => {
            state.counterId += 1
        },
        counterDecrement: (state) => {
            if(state.counterId > 0){
                state.counterId -= 1

            }
        },
        nextProduct: (state) => {
            if(state.productSelectedCounter < state.ticketProducts.length - 1){
                state.productSelectedCounter += 1

            } 
            console.log("Next!");
        },
        previousProduct: (state) => {
            if(state.productSelectedCounter > 0){
                state.productSelectedCounter -= 1

            } 
            console.log("Previous!");
        },
        addProductToGlobalTicket: ( state, action) => {
            


            if(state.ticketProducts.find( listedProduct => action.payload.id == listedProduct.id )){
                console.log('Ya existe');
                state.ticketProducts =  state.ticketProducts.map( producto => {
                        if(action.payload.id == producto.id){
                            return {...producto, ['quantity']: producto.quantity + 1 }
                        }
                        else{
                            return producto
                        }
                    })
                
            }
            else{
                state.ticketProducts = [...state.ticketProducts, action.payload]
                console.log('Product added: ' + JSON.stringify(action.payload));

            }


        },
        removeProductFromGlobalTicket: ( state, action) => {
            


            if(state.ticketProducts.find( listedProduct => action.payload.id == listedProduct.id )){
                console.log('Ya existe');
                state.ticketProducts =  state.ticketProducts.map( producto => {
                        if(action.payload.id == producto.id){
                            return {...producto, ['quantity']: producto.quantity - 1 }
                        }
                        else{
                            return producto
                        }
                    })
                
            }
            else{

                console.log('Product currently inexistent: ' + JSON.stringify(action.payload));

            }


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
            state.selectedProduct = {...action.payload, selected: false, quantity: 1}
            state.error = ''
        })
        builder.addCase(fetchProduct.rejected, (state, action) => {
            state.loading = false
            state.selectedProduct = {}
            state.error = action.error.message
        })

        builder.addCase(editProduct.pending, state => {
            state.loading = true
        })
        builder.addCase(editProduct.fulfilled, (state, action) => {
            state.loading = false
            state.response = action.payload
            state.error = ''
        })
        builder.addCase(editProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
            state.response = null
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
const editProduct = createAsyncThunk('products/editProduct', ({id, findBy, infoUpdated}) => {
    // console.log(value);
    return axios.put(`http://localhost:3001/products/update`, {
        id,
        findBy,
        infoUpdated
    })
    .then( response => response.data)
})
export const { nextProduct, previousProduct, addProductToGlobalTicket, removeProductFromGlobalTicket, counterDecrement, counterIncrement } = productSlicetest.actions
export const productSliceReducer = productSlicetest.reducer
export const fetchAllProducts = fetchProducts
export const fetchOneProduct = fetchProduct
export const editOneProduct = editProduct
