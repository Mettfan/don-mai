import { color } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import { addProductToGlobalTicket, fetchOneProduct, fetchTickets, postTicket, removeProductFromGlobalTicket, sellProducts } from '../../../features/products/productSlicetest';
import CreateProduct from '../../CreateProduct/CreateProduct';
import './TicketCreator.css'
function TicketCreator(props) {
    let [date, setDate] = useState(new Date()) 
    let [productIndex, setProductIndex] = useState(0)
    let cookie = new Cookies()
    let user = cookie.get('user')
    let dispatch = useDispatch()
    let ticketProducts = useSelector(state => state.products.ticketProducts)
    const allProducts = useSelector( state => state.products.products)
    const selectedProduct = useSelector( state => state.products.selectedProduct)
    useEffect(() => {
        document.getElementById('inputSearch').focus()
        let ticketTotal = 0
        console.log('AAAAAAAAA');
        ticketProducts?.forEach((product) => {
            let price = product["P. Venta"]
            ticketTotal += ( price[0]  !== '$' ? Number(price) * Number(product?.quantity) : Number(price.slice(1)) * Number(product?.quantity))
        })
        setState({
            ...state,
            total: ticketTotal
        })
    }, [ticketProducts])
    useEffect(() => {
        setInterval(() => {
            setDate(new Date())
        }, 1000)
    }, [] )
    
    let [state, setState] = useState({
        searchValue: '',
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
                  <div style={{
                    backgroundColor: 'Highlight',
                    color: "white"
                  }}>{match['quantity']}</div>

                </div>
                </>)
              }) :null}
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
        state?.matchList?.length > 0 && setProductIndex(0)
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
          matchList: matches,
          searchValue: searchText
        })
        setProductIndex(0)
        
    
      }
    async function submitTicket (type){
        // Suma o resta de acuerdo a type cada producto y manda su total
        let ticket = ticketProducts.map(product => {
            let fixedQuantity = type === 'entry' ? (Number(product?.quantity) * -1) : product?.quantity;
            
            return {...product, quantity: fixedQuantity}

        })
        //Creamos una funcion asincrónica para que se puedan ejecutar de manera consecutiva los siguientes dispatch
        let promise = new Promise((resolve ) => {
            dispatch(sellProducts({products: ticket}))
            resolve('SOLD')
        })
        await promise.then((result) => {
            dispatch(postTicket({products: ticketProducts, total: Number(state.total), user: user?.email, client: null, description: String(type), createdAt: JSON.stringify(date) }))
            console.log('posteado' , ticket );
            return 'posted'
        }).then((result) => {
            dispatch(fetchTickets())
            console.log(result);
        })
    }

    function handleSwitch(){
        let isSwitchOn = document.getElementById('switch').checked
        setState({...state, ticketType: isSwitchOn ? 'entry' : 'out'})
        console.log('switched', isSwitchOn);

    }
    function handleKeyDown(e){
        console.log('codeeeee'+e?.code);
        if(state?.matchList?.length > 0){

            if(e?.code === 'ArrowUp'){
                console.log('AGREGADO!!!');
                productClicked(state.matchList[productIndex])
            }
            if(e?.code === 'ArrowRight'){
                console.log('SIGUIENTE!!!');
                if(!(Number(productIndex) === Number(state.matchList.length) - 1)){
                    setProductIndex(productIndex + 1)
    
                }
            }
            if(e?.code === 'ArrowLeft'){
                console.log('ANTERIOR!!!');
                if(productIndex > 0 ){
    
                    setProductIndex(productIndex - 1)
                }
                else{
                    setProductIndex(Number(state?.matchList?.length) - 1)
                }
                
            }
            if(e?.code === 'F9'){
                document.getElementById('submitTicket').click()
            }
        }
        else{
            if(e?.code === 'ArrowUp'){
                console.log('ANTERIOR!!!');
                if(productIndex > 0 ){
    
                    setProductIndex(productIndex - 1)
                }
                else{
                    setProductIndex(Number(ticketProducts?.length) - 1)
                }
            }
            if(e?.code === 'ArrowRight'){
                console.log('AGREGADO!!!');
                if(ticketProducts?.length > 0){
                    productClicked([...ticketProducts]?.reverse()[productIndex])

                }
            }
            if(e?.code === 'ArrowLeft'){
                console.log('QUITADO');
                
                removeClicked([...ticketProducts]?.reverse()[productIndex])
                
            }
            if(e?.code === 'ArrowDown'){
                console.log('SIGUIENTE!!!');
                if(!(Number(productIndex) === Number(ticketProducts?.length) - 1)){
                    setProductIndex(productIndex + 1)
    
                }
                
            }
            if(e?.code === 'F9'){
                document.getElementById('submitTicket').click()
            }
        }
    }
    function handleAddProduct2Ticket(e){
        e?.preventDefault()
        console.log(state);
        dispatch(fetchOneProduct({filter: "Código", value: state.searchValue}))
        console.log(selectedProduct);
    }
    useEffect(() => {
        // selectedProduct && dispatch(addProductToGlobalTicket(selectedProduct))
        if(selectedProduct["Producto"]){
            console.log(selectedProduct);
            dispatch(addProductToGlobalTicket(selectedProduct))
            setState({...state, 
                searchValue: '',
                matchList: [],
                inputSearch: ''
            })
            document.getElementById('inputSearch').value = ''
        }
    }, [selectedProduct])
    return ( <>
        {productIndex}
        <div className='ticketCreator'>
            <div>
                {state.ticketType === 'out' ?  'VENDER' : 'RECIBIR'}
            
            </div>
    {/* SLIDER */}
        <label className="switch">
            {JSON.stringify(state.searchValue)}
            <input id='switch' onClick={() => handleSwitch()} type="checkbox"/>
            <span className="slider"></span>
        </label>
        {JSON.stringify(date.toLocaleString())}
    {/*      */}
            <form onSubmit={(e) => handleAddProduct2Ticket(e) }>
                <label className='formTicketCreatorInputProduct'>{ state.inputSearch && ('Nombre: ' + state.inputSearch) || 'Ingrese Código o Nombre'}</label>
                <input onKeyDown={(e) => {handleKeyDown(e)}} autoComplete={'off'} id='inputSearch' name='inputSearch' type={'text'} placeholder='Nombre ó Código' onChange={(e) => {handleOnChange(e)}}></input>
            </form>
            <form>
                <label className='formTicketCreatorName'>{JSON.stringify(user?.name)}</label>
                {ticketProducts?.length && ticketProducts?.map( product => productCard(product) )?.reverse() || 'Agregue algunos productos!'}
                <div>
                    <label className='formTicketCreatorTotal'>{ state.total && ('Total: ' +( '$' + state?.total) || '$0')}</label>
                </div>
                <button id='submitTicket' className='createTicketSubmitButton' onClick={ () => {submitTicket(state.ticketType)}}>CREAR TICKET</button>
                {productThumb()}
            </form>

        </div>
    </> );
}

export default TicketCreator;