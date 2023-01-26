import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import { addProductToGlobalTicket, fetchOneProduct, postTicket, removeProductFromGlobalTicket, sellProducts } from '../../../features/products/productSlicetest';
import CreateProduct from '../../CreateProduct/CreateProduct';
import './TicketCreator.css'
function TicketCreator(props) {
    let cookie = new Cookies()
    let user = cookie.get('user')
    let dispatch = useDispatch()
    let ticketProducts = useSelector(state => state.products.ticketProducts)
    const allProducts = useSelector( state => state.products.products)
    useEffect(() => {
        document.getElementById('inputSearch').focus()
        let ticketTotal = 0
        console.log('AAAAAAAAA');
        ticketProducts?.forEach((product) => {
            let price = product["P. Venta"]
            ticketTotal += (price[0] !== '$' ? Number(price) * Number(product?.quantity) : Number(price.slice(1)) * Number(product?.quantity))
        })
        setState({
            ...state,
            total: ticketTotal
        })
    }, [ticketProducts])
    let [state, setState] = useState({
        inputSearch: '',
        total: 0,
        matchList: [],
        ticketType: 'out'
    })
    let productThumb = () => {
        return(<>
            
            <div id={state.matchList.length >= 1 && 'matchList'}>
              {state.matchList.length >= 1 ? state.matchList.map(match => {
                return (<>
                <div id={'matchContainer'} onClick={()=>{productClicked(match)}}>
                  <div>
                    {match['Producto']}
                  </div>
                  <div>
                    {match['P. Venta']}
                  </div>
                  <div>
                    {match['id']}
                  </div>

                </div>
                </>)
              }) :<CreateProduct></CreateProduct>}
            </div>
        
        </>)
    }
    function productClicked(product){
        dispatch(addProductToGlobalTicket(product))
        document.getElementById('inputSearch').value = ''
        document.getElementById('inputSearch').focus()
        setState({
            ...state,
            matchList: []
        })
    }
    function removeClicked(product){
        dispatch(removeProductFromGlobalTicket(product))
    }
    let productCard = (product) => {
        return(<>
            <div onClick={() => productClicked(product)} className='productCardTicketCreatorContainer'> 
                <div className='productsCTCQuantity'>{product['quantity']}</div>
                <div>
                    <div className='productsCTCName'>{product['Producto']}</div>
                    <div className='productsCTCPrice'>{product['P. Venta']}</div>
                </div>
            
            </div>
           { <span className='removeProductFromTicketCreator' onClick={() => {removeClicked(product)}}> - </span>}
        </>)
    }
    async function handleOnChange (e){
        console.log(e.target.value);
        setState({
            ...state,
            searchValue: e.target.value
        })
        searchStates(e.target.value)
      }
    function searchStates(searchText){
        
        let matches = allProducts.filter(product => {
          const regex = new RegExp(`^${searchText}`, 'gi')
          return product['Producto']?.match(regex) || product['Código']?.match(regex) || product['Departamento']?.match(regex) 
        })
        if(searchText.length === 0){
          matches = []
        }
        console.log(matches);
        setState({
          ...state,
          matchList: matches
        })
    
      }
    function submitTicket (type){
        // Suma o resta de acuerdo a type cada producto y manda su total
    let ticket = ticketProducts.map(product => {
        let fixedQuantity = type === 'entry' ? (Number(product?.quantity) * -1) : product?.quantity;
        
        return {...product, quantity: fixedQuantity}

    })
    dispatch(sellProducts({products: ticket}))
    dispatch(postTicket({products: ticketProducts, total: Number(state.total), user: user?.email, client: null, description: String(type)}))
    console.log('posteado' , ticket );
    }
    function handleOnTicketSubmit(e){
        e.preventDefault && e.preventDefault()
        window.location.reload()
    }
    function handleSwitch(){
        let isSwitchOn = document.getElementById('switch').checked
        setState({...state, ticketType: isSwitchOn ? 'entry' : 'out'})
        console.log('switched', isSwitchOn);

    }
    return ( <>
        <div className='ticketCreator'>
            <div>
                {state.ticketType === 'out' ?  'VENDER' : 'RECIBIR'}
            
            </div>
    {/* SLIDER */}
        <label className="switch">
            <input id='switch' onClick={() => handleSwitch()} type="checkbox"/>
            <span className="slider"></span>
        </label>
    {/*      */}
            <form onSubmit={(e) => {handleOnTicketSubmit(e)} }>
                <label className='formTicketCreatorName'>{JSON.stringify(user?.name)}</label>
                <div>
                    <label className='formTicketCreatorInputProduct'>{ state.inputSearch && ('Nombre: ' + state.inputSearch) || 'Ingrese Código o Nombre'}</label>
                    <input autoComplete={'off'} id='inputSearch' name='inputSearch' type={'text'} placeholder='Nombre ó Código' onChange={(e) => {handleOnChange(e)}}></input>
                </div>
                {ticketProducts?.length && ticketProducts?.map( product => productCard(product) )?.reverse() || 'Agregue algunos productos!'}
                <div>
                    <label className='formTicketCreatorTotal'>{ state.total && ('Total: ' +( '$' + state.total) || '$0')}</label>
                </div>
                <button className='createTicketSubmitButton' onClick={ () => {submitTicket(state.ticketType)}}>CREAR TICKET</button>
                {productThumb()}
            </form>

        </div>
    </> );
}

export default TicketCreator;