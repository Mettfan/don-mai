import {
    ADD_PRODUCTS, ERROR
} from '../actions/productActions'

const initialState = {
    status: {}
}

function productReducer( state = initialState, action) {
    switch (action.type) {
        case ADD_PRODUCTS:
            return { ...state, status: [...action.payload.productos]}
        case ERROR:
            return { ...state, status: action.payload}
        default: 
            return { ...state }
    }
}

export default productReducer