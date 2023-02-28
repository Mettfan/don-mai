import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
let cookie = new Cookies()
export const analyticsSlice = createSlice({
    name: 'analytics',
    initialState: {
        loading: false,
        analytic: {},
        income: 0,
        outcome: 0,
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

        builder.addCase(fetchIncome.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchIncome.fulfilled, (state, action) => {
            state.loading = false
            state.income = {...action.payload}
            state.error = ''
        })
        builder.addCase(fetchIncome.rejected, (state, action) => {
            state.loading = false
            state.income = 0
            state.error = action.error.message
        })


        builder.addCase(fetchOutcome.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchOutcome.fulfilled, (state, action) => {
            state.loading = false
            state.outcome = {...action.payload}
            state.error = ''
        })
        builder.addCase(fetchOutcome.rejected, (state, action) => {
            state.loading = false
            state.outcome = 0
            state.error = action.error.message
        })

    }
})


const fetchAnalytics = createAsyncThunk('users/fetchAnalytics', ({analytic}) => {
    console.log(analytic);
    return axios.get(`http://localhost:3001/analytic/${analytic}`)
    .then( response => response.data)
})
const fetchIncome = createAsyncThunk('users/fetchIncome', () => {
    return axios.get(`http://localhost:3001/analytic/income`)
    .then( response => response.data)
})
const fetchOutcome = createAsyncThunk('users/fetchOutcome', () => {
    return axios.get(`http://localhost:3001/analytic/outcome`)
    .then( response => response.data)
})

export const { 
    setCounter

} = analyticsSlice.actions
// export const productSliceReducer = productSlicetest.reducer
export const getAnalytics = fetchAnalytics 
export const getIncome = fetchIncome 
export const getOutcome = fetchOutcome 