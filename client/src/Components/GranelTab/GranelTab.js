import React, { useEffect, useState } from 'react';
import './GranelTab.css'
import { addProductToGlobalTicket } from '../../features/products/productSlicetest';
import { useDispatch } from 'react-redux';
function GranelTab({product, weightFactor, closeCallback}) {
    let dispatch = useDispatch()
    let [state, setState] = useState({
        granelType: 'byWeight', // or 'byPrice'
        userInput: null,
        userPayment: 0,
        productQuantity: 0,
        granelShown: true

    })
    useEffect(() => {
        document.getElementById('granelInput')?.focus()
    }, [])
    useEffect(() => {
        let price = product['P. Venta']
        let userInput = Number(state.userInput)
        let formattedPrice = Number(price[0]  !== '$' ? Number(price) : Number(price.slice(1)) )
        if(state.granelType === 'byPrice'){
            console.log('price: ' + price);
            console.log('userInput: ' + userInput);
            console.log('formattedPrice: ' + formattedPrice);
            console.log('weightFactor: ' + weightFactor);
            
            setState({...state, productQuantity: Math.round(userInput * (Number(weightFactor))/formattedPrice), userPayment: 0})
            
        }
        else{
            setState({...state, userPayment: Math.round((userInput * formattedPrice) / Number(weightFactor)), productQuantity: 0})
            
        }

    }, [state.userInput, state.granelType] )
    useEffect(() => {
     
        document.getElementById('granelInput').value = ''
        document.getElementById('granelInput')?.focus()
        setState({...state, userPayment: 0, productQuantity: 0})
    }, [state.granelType])
    function handleInputOnChange(e){
        setState({...state, userInput: e.target.value})
    }
    function handleOnTypeChange(){
        setState({...state, granelType: state.granelType === 'byWeight' ? 'byPrice' : 'byWeight'})
    }
    function addGranelToTicket(product){
        dispatch(addProductToGlobalTicket(product))
    }
    function handleGranelSubmit(e){
        e?.preventDefault && e?.preventDefault()
        let granelType = state.granelType
        let price = product['P. Venta']
        let formattedPrice = Number(price[0]  !== '$' ? Number(price) : Number(price.slice(1)) )
        addGranelToTicket({...product, adder: granelType === 'byPrice' ? state.productQuantity : Number(state.userInput), ['P. Venta']: formattedPrice/weightFactor})
        setState({...state, granelShown: false })
        closeCallback && closeCallback()
    }
    
    return ( <>
    
        {state.granelShown && <div className='granelAdderContainer'>
            <h1>GRANEL ADDER</h1>
            <h1>{product['Código']}</h1>
            <button onClick={() => {handleOnTypeChange()}}>{state.granelType === 'byWeight' ? 'Por Gramos' : 'Por Cantidad $' }</button>
            <form onSubmit={(e) => {handleGranelSubmit(e)}}>
                <div className='granelInputGroup'>
                    {state.granelType === 'byPrice' && '$' }
                    <input id='granelInput' placeholder={state.granelType === 'byWeight' ? 'gr' : '$' } type='number' onChange={e => handleInputOnChange(e)}></input>
                    {state.granelType === 'byWeight' && 'gr' }
                </div>
                <div>

                </div>
                {/* {state.userInput} */}
                {state.userPayment && <h1 className='userPaymentGranel'>
                    {('Pago: $'+ state.userPayment) }
                </h1>}
               {state.productQuantity &&  <div className='productQuantityGranel'>
                    {('Despacha: ' + state.productQuantity + ' gr')}
                </div>}
                <button type='submit'>AGREGAR</button>
            </form>

        </div>}
    
    </> );
}

export default GranelTab;