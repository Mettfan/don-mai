import React, { useEffect } from "react";
import { useSelector } from "react-redux";
export function Ticket(){

    let selectedProduct = useSelector( state => state.products.selectedProduct)
    useEffect(()=> {
        console.log(selectedProduct);
    }, [selectedProduct])
    return (<>

        <div>TICKET</div>

    
    </>)
}