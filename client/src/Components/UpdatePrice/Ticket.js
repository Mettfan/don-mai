import React, { useEffect } from "react";
import './Ticket.css'
import { useState } from "react";
import { useSelector } from "react-redux";
import productPlaceholder from '../../Assets/productPlaceholder.png'
import { Example } from "./PrintTest";

export function Ticket(){

    let [state, setState] = useState({
        ticketProducts: []
    })
    let ticketProducts = state.ticketProducts

    let selectedProduct = useSelector( state => state.products.selectedProduct)
    useEffect(()=> {
        console.log(ticketProducts);
        if(selectedProduct['P. Venta']){
            addProductToTicket(selectedProduct)

        }
    }, [selectedProduct])
    function addProductToTicket ( product ) {
        if(product){

            if(ticketProducts.find( listedProduct => product.id == listedProduct.id )){
                console.log('Ya existe');
            }
            else{
                setState({
                    ...state,
                    ticketProducts: [...state.ticketProducts, product]
                })

            }


        }
    }
    function totalTicket(){
        let total = 0;
        ticketProducts.forEach( (product) => {
            total += Number(product['P. Venta'].slice(1))
        })
        return total
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
                    <td>{producto['quantity']}</td>
                    <td>{producto.Producto.substring(0, 10) }</td>
                    <td>{producto['P. Venta']}</td>

                </tr>
                })}
            
        </table>
            <div>
            </div>
            <div className="totalTicket">
            {'A pagar: ' + '$' + totalTicket()}            
        </div>

        </>)

    }
    return (<>
        <div className="downSearchContainer">

            {/* <div>TICKET</div> */}
            <div className="totalTicket">
                {'$' + totalTicket()}            
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


    
    </>)
}