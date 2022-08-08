import React, { useEffect } from "react";
import './Ticket.css'
import { useState } from "react";
import { useSelector } from "react-redux";
import productPlaceholder from '../../Assets/productPlaceholder.png'

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
    return (<>

        <div>TICKET</div>
        <div className="totalTicket">
            {'$' + totalTicket()}            
        </div>
        <div>
            {/* {JSON.stringify(ticketProducts)} */}
        </div>
        {ticketProducts && ticketProducts.map( product => {
                return ( <div className="catalogContainer">
                    <span className="productBg">
                        <img className="productImage" src={productPlaceholder }/>
                        <div className="productInfoContainer">
                            <div>{product.Producto}</div>
                            <div>{product['P. Venta']}</div>
                            <div>{product['quantity']}</div>

                        </div>

                    </span>

                </div>)
            })}


    
    </>)
}