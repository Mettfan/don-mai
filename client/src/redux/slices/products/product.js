import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { downloadExcel } from "../../../Components/Convert/Convert";
export const productSlice = createSlice({
    name: 'products',
    initialState: {
        list: []
    },
    reducers: {
        setProductList: ( state, action ) => {
            state.list = action.payload.db
        }
    }
})
export const { setProductList } = productSlice.actions
export default productSlice.reducer
export const fetchAllProducts = ( ) => (dispatch) => {
     axios.get('http://localhost:3001/products').then(
        (response) => {
            console.log(response);
            console.log('passed');
            // cookie.set('response', response.data.db)
            downloadExcel(response.data.db)
        },
        (error) => {
            console.log(error);
        }
    )
}
