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
    let today = new Date()
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today =  mm + '-' + dd + '-' + yyyy;
     axios.get('http://localhost:3001/products').then(
        (response) => {
            console.log(response);
            console.log('passed');
            // cookie.set('response', response.data.db)
            downloadExcel(response.data.db, "Respaldo-" + today  )
        },
        (error) => {
            console.log(error);
        }
    )
}
