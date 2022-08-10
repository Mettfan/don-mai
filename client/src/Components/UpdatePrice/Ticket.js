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
        let products =  ticketProducts.map( product => {
            return ( <div>
                <span>
                    {/* <img className="productImage" src={productPlaceholder }/> */}
                    <div>
                        <div>{product.Producto}</div>
                        <div>{product['P. Venta']}</div>
                        <div>{product['quantity']}</div>

                    </div>

                </span>

            </div>)

        })
        return (<>
            <div>
                {products}
            </div>
            <div className="totalTicket">
            {'A pagar: ' + '$' + totalTicket()}            
        </div>

        </>)

    }
    return (<>

        <div>TICKET</div>
        <div className="totalTicket">
            {'$' + totalTicket()}            
        </div>
        <div>
            {/* {JSON.stringify(ticketProducts)} */}
        </div>
        <Example ticket = {currentTicket()} ></Example>
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