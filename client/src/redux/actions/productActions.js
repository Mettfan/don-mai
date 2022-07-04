import axios from "axios"
import Cookies from "universal-cookie"
export  const ADD_PRODUCTS = 'ADD_PRODUCTS'
export  const GET_PRODUCTS = 'GET_PRODUCTS'
export  const ERROR = 'ERROR'

let cookie  = new Cookies()
export  const addProducts = ( products ) => async ( dispatch ) => {
// let cookie = new Cookies()
    await axios.post('http://localhost:3001/products/upload', { productos: products}).then(
        (response) => {
            console.log(response);
            console.log('passed');
            // cookie.set('productsSent', products)
            dispatch ({
                type: ADD_PRODUCTS,
                payload: response.data
            })
        },
        (error) => {
            dispatch ({
                type: ERROR,
                payload: error.error
            })
        }
    )

}
export  const getProducts = (  ) => async ( dispatch ) => {
// let cookie = new Cookies()
    await axios.get('http://localhost:3001/products').then(
        (response) => {
            console.log(response);
            console.log('passed');
            cookie.set('response', response.data.db)
            dispatch ({
                type: GET_PRODUCTS,
                payload: response.data
            })
        },
        (error) => {
            dispatch ({
                type: ERROR,
                payload: error.error
            })
        }
    )

}