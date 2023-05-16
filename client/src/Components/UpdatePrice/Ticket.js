import React, { useEffect } from "react";
import './Ticket.css'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import productPlaceholder from '../../Assets/productPlaceholder.png'
import { Example } from "./PrintTest";
import { addProductToGlobalTicket, removeProductFromGlobalTicket, setProductQuantity } from "../../features/products/productSlicetest";
import Draggable from 'react-draggable'
import Calculator from "../Calculator/Calculator";
export function Ticket(){

    let [state, setState] = useState({
        ticketProducts: [],
        ticketSelectedProduct: {},
        total: 0,
        change: 0,
        payment: 0
    })
    let dispatch = useDispatch()
    let ticketProducts = useSelector( state => state.products.ticketProducts)
    let selectedProductCounter = useSelector( state => state.products.productSelectedCounter)
    let selectedProduct = useSelector( state => state.products.selectedProduct)
    let globalTicket = useSelector( state => state.products.ticketProducts)
    let userPayment = useSelector(state => state.products.payment)
    let [productQuantityState, changeProductQuantityState] = useState(1)
    useEffect(() => {
        calculateChange(userPayment)
        setState({...state,
            payment: userPayment
        })
    }, [userPayment])
    useEffect(()=> {
        console.log(ticketProducts);
        if(selectedProduct['P. Venta']){
            addProductToTicket(selectedProduct)

        }

    }, [selectedProduct])
    useEffect(()=> {
        setState({
            ...state,
            ticketSelectedProduct: ticketProducts[selectedProductCounter]
        })

    }, [selectedProductCounter])
    useEffect(()=> {
        let newTotal = 0
        console.log('CHANGING NEWTOTAL');
        newTotal = ticketProducts.reduce((accumulator, currentValue) => {
            let currentQuantity = Number(currentValue.quantity)
            let currentPrice = currentValue['P. Venta']
            let formattedCurrentPrice = currentPrice.includes('$') ? Number(currentPrice.slice(1)   ) : Number(currentPrice)
            let result  = accumulator + (currentQuantity * formattedCurrentPrice )
            console.log(accumulator);
            console.log(currentValue)
            console.log('DATAS');;
            console.log(currentQuantity);
            console.log(currentPrice);
            console.log(formattedCurrentPrice);
            console.log(result);
            return result
        }, 0)
        console.log(newTotal);
        setState({
            ...state,
            total: newTotal,
            change: newTotal - state.payment
        })
        

    }, [ticketProducts])
    
    function addProductToTicket ( product ) {
        let newTotal = null
        if(product){
            
            dispatch(addProductToGlobalTicket(product))
            //Verifica si el producto viene con el signo de pesos
            newTotal = state.total + ( product['P. Venta']?.includes('$') ? Number(product['P. Venta'].slice(1)   ) : Number(product['P. Venta']) )
            setState({
                ...state,
                total: newTotal
            })
            // calculateChange()
  
        }
    }
    function removeProductFromTicket ( product ) {
        let newTotal = null
        if(product){

            dispatch(removeProductFromGlobalTicket(product))
            
            newTotal = (state.total > 0 && state.total - (product['P. Venta']?.includes('$') ? Number(product['P. Venta'].slice(1)   ) : Number(product['P. Venta'])) || 0   )
            setState({
                ...state,
                total: newTotal
            })
            // calculateChange()

            
            
  
        }
    }
    function totalTicket(){
        let total = 0;
        globalTicket['P. Venta'] && globalTicket.forEach( (product) => {
            total += Number(product['P. Venta'].slice(1)*product?.quantity)
        })
        setState({
            ...state,
            total: total
        })
    }
    function currentTicket(){
        
        return (<>
        <table>
                <tr>
                    <td>{'Cant.'}</td>
                    <td>{'Concepto'}</td>
                    <td>{'Precio'}</td>
                    
                </tr>
                {ticketProducts.map(producto => {
                    return <tr>
                    <td>{Number(producto?.quantity)}</td>
                    <td>{producto?.Producto?.substring(0, 10) }</td>
                    <td>{producto['P. Venta'] && producto['P. Venta']}</td>

                </tr>
                })}
            
        </table>
            <div className="totalTicket">
                {'A pagar: ' + '$' + state.total}            
                <div>
                    {'Pagado: ' + '$' + state.payment } 

                </div>
            <div>
                {( Number(state.change) < 0 ? 'Cambio: ' : 'FALTAN: ' )+ '$' + (Number(state.change) < 0 ? (Number(state.change) * -1) : state.change)}
            </div>
        </div>

        </>)

    }
    function calculateChange(payingQuantity){
        setState({
            ...state,
            change: state.total - payingQuantity
        })
        
    }
    function handleInputPaymentOnChange(e){
        
        setState({
            ...state,
            payment: e.target.value,
            change: state.total - e.target.value
        })
        // calculateChange(e.target.value)
    }
    async function handlePaymentOnSubmit(e){
        e?.preventDefault && e.preventDefault()
        let promise = new Promise((resolve) => {
            calculateChange(state.payment)
            resolve('Changed')
        })
        // await promise.then((result) => {
        //     console.log(result);

        //         let newTotal = ticketProducts.reduce((accumulator, currentValue) => accumulator + (Number(currentValue.quantity )*  (currentValue['P. Venta']?.includes('$') ? Number(currentValue['P. Venta'].slice(1)   ) : Number(currentValue['P. Venta']))))
        //         console.log(newTotal);
        //         setState({
        //             ...state,
        //             total: newTotal
        //         })
        //         // calculateChange()

        //     // newTotal = ticketProducts.map(product => {
        //     //     if()
        //     //     return product
        //     // })
        //     // setState({
        //     //     ...state,
        //     //     total: newTotal
        //     // })
        // })
    }
    // Arreglar el sumador A pagar al submitear el quantity manualmente
    async function handleProductOnChangeSubmit({product, e}){
        e?.preventDefault && e.preventDefault()
        console.log('submited');
        console.log({...product, quantity: Number(productQuantityState)});
        let promise = new Promise ((resolve) => {
            dispatch(setProductQuantity({...product, quantity: Number(productQuantityState)}))
            resolve('set')
        })
        await promise
    }
    function onChangeProductQuantity(e){
        console.log(e.target?.value);
        console.log(productQuantityState);
        changeProductQuantityState(e.target?.value)
    }
    return (<>
        <div className="downSearchContainer">
                <Calculator></Calculator>
            {/* <div>TICKET</div> */}
            <div className="totalTicketCalculated">
                {'$' + state.total}            
            </div>
            <div>
                {/* {JSON.stringify(ticketProducts)} */}
            </div>
            <div className="ticketContainer">

            <Example ticket = {currentTicket()} payment = {state.payment} change = {state.change} total = {state.total} showTicket = {true} falta = {Number(state.change) > 0 ? true : false}></Example>
            </div>
            <div className="productTicketContainer" >
                {ticketProducts && ticketProducts.map( product => {
                        return (<div className="productTicketAddedContainer">

                        
                        <button className="buttonRemoveProduct" onClick={() => { removeProductFromTicket(product) }}>-</button>
                        <div className="productTicketAdded">
                                <img className="productTicketAddedImage" src={productPlaceholder }/>
                                <div className="">
                                    <div>{product.Producto.substring(0, 10) }</div>  
                                    <div>{product['P. Venta']}</div>
                                    {/* <div>{Number(product['quantity'] )}</div> */}
                                    <form onSubmit = {(e) => handleProductOnChangeSubmit({product: product, e: e }) }>
                                        <input type="number"  onChange={ (e) => {onChangeProductQuantity(e) } } ></input>
                                    </form>

                                </div>

                        </div>
                        <button className="buttonAddProduct" onClick={() => { addProductToTicket(product) }}>+</button>
                        </div>)
                    })}
                
            </div>
        </div>
        { ticketProducts.length > 0 && <div className="paymentInput">
            <form onSubmit={(e) => handlePaymentOnSubmit(e)}>
                <input placeholder="Paying with: " onChange={(e) => handleInputPaymentOnChange(e)} /> 

            </form>
            {state.change}
        </div>}
        {productQuantityState}
        {/* <div>{JSON.stringify(state.ticketSelectedProduct)}</div> */}
        {/* <div>{JSON.stringify(globalTicket)}</div> */}
        

    
    </>)
}