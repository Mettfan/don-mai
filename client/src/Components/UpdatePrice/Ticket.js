import React, { useEffect } from "react";
import './Ticket.css'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import productPlaceholder from '../../Assets/productPlaceholder.png'
import { Example } from "./PrintTest";
import { addProductToGlobalTicket, removeProductFromGlobalTicket } from "../../features/products/productSlicetest";
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
    function addProductToTicket ( product ) {
        if(product){

            dispatch(addProductToGlobalTicket(product))
            setState({
                ...state,
                total: state.total + Number(product['P. Venta'].slice(1) )
            })
            // calculateChange()
  
        }
    }
    function removeProductFromTicket ( product ) {
        if(product){

            dispatch(removeProductFromGlobalTicket(product))
            

            setState({
                ...state,
                total: state.total - Number(product['P. Venta'].slice(1) )
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
                    <td>{producto?.quantity}</td>
                    <td>{producto?.Producto?.substring(0, 10) }</td>
                    <td>{producto['P. Venta'] && producto['P. Venta']}</td>

                </tr>
                })}
            
        </table>
            <div className="totalTicket">
            {'A pagar: ' + '$' + state.total}            
            <div>
                {'Pagado: ' + '$' + state.payment}
            </div>
            <div>
                {'Cambio: ' + '$' + state.change}
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
            payment: e.target.value
        })
        // calculateChange(e.target.value)
    }
    function handlePaymentOnSubmit(e){
        e?.preventDefault && e.preventDefault()
        calculateChange(state.payment)
    }
   
    return (<>
        <div className="downSearchContainer">
            <Draggable>
                <Calculator></Calculator>
            </Draggable>
            {/* <div>TICKET</div> */}
            <div className="totalTicketCalculated">
                {'$' + state.total}            
            </div>
            <div>
                {/* {JSON.stringify(ticketProducts)} */}
            </div>
            <div className="ticketContainer">

            <Example ticket = {currentTicket()} payment = {state.payment} change = {state.change} showTicket = {true} ></Example>
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
                                    <div>{product['quantity']}</div>

                                </div>

                        </div>
                        <button className="buttonAddProduct" onClick={() => { addProductToTicket(product) }}>+</button>
                        </div>)
                    })}
                
            </div>
        </div>
        <div className="paymentInput">
            <form onSubmit={(e) => handlePaymentOnSubmit(e)}>
                <input placeholder="Paying with: " onChange={(e) => handleInputPaymentOnChange(e)} /> 

            </form>
            {state.change}
        </div>
        {/* <div>{JSON.stringify(state.ticketSelectedProduct)}</div> */}
        {/* <div>{JSON.stringify(globalTicket)}</div> */}
        

    
    </>)
}