import React, { useEffect, useState } from 'react';
import './CheckoutTab.css'
import PrintComponent from '../PrintComponent.js/PrintComponent';
function CheckoutTab({total, afterCheckoutCallback, closeCallback, Component}) {
    let [recibido, setRecibido] = useState(0)
    let [faltante, setFaltante] = useState(total)
    let [restante, setRestante] = useState(0)
    useEffect(() => {
        let result = total - recibido
        if(result <= 0){
            setRestante(-result)
            setFaltante(0)
        }
        else{
            setFaltante(result)
            setRestante(0)
        }
    }, [total, recibido])
    useEffect(() => {
        document.getElementById('receiptValue').focus()

    }, [])
    function handleOnInputChange(e){
        if(!isNaN(e.target.value)){
            setRecibido(e.target.value)
        }
    }
    function handleOnKeyDown(e){
        let keycode = e?.keyCode
        if(Number(keycode) === 27){
            closeCallback()
        }
        console.log(keycode);
    }
    return ( <>

        <div className='checkoutTab'>
            <h1>TOTAL A PAGAR:</h1>
            <h2>{total}</h2>       
            <input id = 'receiptValue' type='number' placeholder='RECIBIDO' onKeyDown={(e) => handleOnKeyDown(e) } onChange={(e) => handleOnInputChange(e) }></input>
            <div className='checkoutResultContainer'>
                <div className='checkoutFaltante'>
                    {faltante > 0 && 'FALTAN: ' + faltante + ' PESOS'}     
                </div>
                {restante > 0 && 
                    <div className='checkoutSobrante'>
                        <div>
                            {'SOBRAN: ' + restante + ' PESOS'}     
                        </div>
                        <div>
                            {restante > 0 &&<PrintComponent component = {<Component/>} afterPrintCallback = {afterCheckoutCallback} buttonComponent = {<div className='paymentButton'>COBRAR</div>}></PrintComponent>}
                        </div>
                    </div>
                }
                {(faltante + restante) === 0 && <PrintComponent component = {  <Component/>} afterPrintCallback = {afterCheckoutCallback} buttonComponent = {<div className='paymentButton'>COBRAR</div>}></PrintComponent> }
                
            </div>
        </div>    
    
    </> );
}

export default CheckoutTab;