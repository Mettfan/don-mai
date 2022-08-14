import React, { useEffect } from "react";
import './Ticket.css'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import productPlaceholder from '../../Assets/productPlaceholder.png'
import { Example } from "./PrintTest";
import { addProductToGlobalTicket } from "../../features/products/productSlicetest";

export function Ticket(){

    let [state, setState] = useState({
        ticketProducts: [],
        ticketSelectedProduct: {},
        total: 0
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
                    <td>{producto?.Producto.substring(0, 10) }</td>
                    <td>{producto['P. Venta'] && producto['P. Venta']}</td>

                </tr>
                })}
            
        </table>
            <div>
            </div>
            <div className="totalTicket">
            {'A pagar: ' + '$' + state.total}            
        </div>

        </>)

    }
    return (<>
        <div className="downSearchContainer">

            {/* <div>TICKET</div> */}
            <div className="totalTicket">
                {'$' + state.total}            
            </div>
            <div>
                {/* {JSON.stringify(ticketProducts)} */}
            </div>
            <Example ticket = {currentTicket()} ></Example>
            <div className="productTicketAddedContainer">
                {ticketProducts && ticketProducts.map( product => {
                        return ( <div className="productTicketAdded">

                                <img className="productTicketAddedImage" src={productPlaceholder }/>
                                <div className="">
                                    <div>{product.Producto.substring(0, 10) }</div>  
                                    <div>{product['P. Venta']}</div>
                                    <div>{product['quantity']}</div>

                                </div>

                        </div>)
                    })}
                
            </div>
        </div>
        <div>{JSON.stringify(state.ticketSelectedProduct)}</div>
        <div>{JSON.stringify(globalTicket)}</div>


    
    </>)
}