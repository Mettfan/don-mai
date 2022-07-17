import axios from "axios"
import Cookies from "universal-cookie"
export  const ADD_PRODUCTS = 'ADD_PRODUCTS'
export  const GET_PRODUCTS = 'GET_PRODUCTS'
export  const GET_PRODUCT = 'GET_PRODUCT'
export  const GET_PRODUCT_BY_BARCODE = 'GET_PRODUCT_BY_BARCODE'

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
export  const getProduct = ( id ) => async ( dispatch ) => {
// let cookie = new Cookies()
    await axios.get(`http://localhost:3001/products/?id=${id}`).then(
        (response) => {
            // cookie.set('productSelected', response.data)
            console.log(response);
            console.log('passed');
            cookie.set('currentProduct', response.data)
            dispatch ({
                type: GET_PRODUCT,
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
export  const getProductByBarcode = ( codigo ) => async ( dispatch ) => {
// let cookie = new Cookies()
    await axios.get(`http://localhost:3001/products/?Código=${codigo}`).then(
        (response) => {
            // cookie.set('productSelected', response.data)
            console.log(response);
            console.log('passed');
            cookie.set('currentProduct', response.data)
            dispatch ({
                type: GET_PRODUCT_BY_BARCODE,
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