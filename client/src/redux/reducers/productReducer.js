import {
    ADD_PRODUCTS, ERROR, GET_PRODUCTS
} from '../actions/productActions'

const initialState = {
    status: null
}

function productReducer( state = initialState, action) {
    switch (action.type) {
        case ADD_PRODUCTS:
            return { ...state, status: [...action.payload.productos]}
        case GET_PRODUCTS:
            return { ...state, status: action.payload}
        case ERROR:
            return { ...state, status: action.payload}
        default: 
            return { ...state }
    }
}

export default productReducer