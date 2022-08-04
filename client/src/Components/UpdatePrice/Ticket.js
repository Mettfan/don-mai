import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
export function Ticket(){

    let [state, setState] = useState({
        ticketProducts: []
    })
    let ticketProducts = state.ticketProducts

    let selectedProduct = useSelector( state => state.products.selectedProduct)
    useEffect(()=> {
        console.log(selectedProduct);
        addProductToTicket(selectedProduct)
    }, [selectedProduct])
    function addProductToTicket ( product ) {
        if(product){
            setState({
                ...state,
                ticketProducts: [...state.ticketProducts, product]
            })

        }
    }
    return (<>

        <div>TICKET</div>
        <div>
            {JSON.stringify(ticketProducts)}
        </div>


    
    </>)
}