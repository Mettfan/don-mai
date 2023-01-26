import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
let cookie = new Cookies()
export const analyticsSlice = createSlice({
    name: 'analytics',
    initialState: {
        loading: false,
        analytic: {},
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

        builder.addCase(fetchAnalytics.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchAnalytics.fulfilled, (state, action) => {
            state.loading = false
            state.analytic = {...action.payload}
            state.error = ''
        })
        builder.addCase(fetchAnalytics.rejected, (state, action) => {
            state.loading = false
            state.analytic = {}
            state.error = action.error.message
        })

    }
})


const fetchAnalytics = createAsyncThunk('users/fetchAnalytics', ({analytic}) => {
    console.log(analytic);
    return axios.get(`http://localhost:3001/analytic/mostSold/?analytic=${analytic}`)
    .then( response => response.data)
})

export const { 
    setCounter

} = analyticsSlice.actions
// export const productSliceReducer = productSlicetest.reducer
export const getAnalytics = fetchAnalytics 