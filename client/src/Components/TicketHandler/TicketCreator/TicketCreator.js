import { color } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import { addProductToGlobalTicket, deleteProductFromGlobalTicket, fetchOneProduct, fetchTickets, getMyProducts, postTicket, removeProductFromGlobalTicket, sellProducts } from '../../../features/products/productSlicetest';
import CreateProduct from '../../CreateProduct/CreateProduct';
import './TicketCreator.css'
import GranelTab from '../../GranelTab/GranelTab';
import CheckoutTab from '../CheckoutTab/CheckoutTab';
import { useReactToPrint } from 'react-to-print';
import TicketForPrinting from './TicketForPrinting/TicketForPrinting';
function TicketCreator(props) {
    let [date, setDate] = useState(new Date()) 
    let [productIndex, setProductIndex] = useState(0)
    let cookie = new Cookies()
    let user = cookie.get('user')
    let dispatch = useDispatch()
    let ticketProducts = useSelector(state => state.products.ticketProducts)
    const allProducts = useSelector( state => state.products.products)
    const userProducts = useSelector( state => state.products.userProducts)
    const selectedProduct = useSelector( state => state.products.selectedProduct)
    let [isCheckoutVisible, setCheckout] = useState(false)
    useEffect(() => {
        dispatch(getMyProducts({userId: user.id}))
    }, [])
    useEffect(() => {
        if(isCheckoutVisible === false){
            document.getElementById('inputSearch')?.focus()

        }
    }, [isCheckoutVisible])
    function togglePaymentCheckout(){
        if(isCheckoutVisible){
            setCheckout(false)
            console.log('hidden');
        }
        else{
            setCheckout(true)
            console.log('shown');
        }
    }
    let [state, setState] = useState({
        searchValue: '',
        inputSearch: '',
        total: 0,
        matchList: [],
        ticketType: 'out',
        granelTab: false
    })
    useEffect(() => {
        setState({...state, matchList: state.matchList.map((product) => {
            if(product?.id == state.matchList[productIndex]?.id ){
                return {...product, selected: true}
            }
            else{
                return {...product, selected: false}
            }
        })})
    }, [productIndex])
    useEffect(() => {
        let searchInput = document.getElementById('inputSearch')?.value
        searchInput && (document.getElementById('inputSearch').value = '')
        
        if(!state.granelTab){
            document.getElementById('inputSearch')?.focus()
            
        }
  

    },[state.granelTab])
    useEffect(() => {
        let ticketTotal = 0
        ticketProducts?.forEach((product) => {
            let price = product["P. Venta"]
            ticketTotal += Math.round( price[0]  !== '$' ? Number(price) * Number(product?.quantity) : Number(price.slice(1)) * Number(product?.quantity))
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
    

    let f9 = () => {
        togglePaymentCheckout()
    } 
    function handleDeleteProduct(product){
        dispatch(removeProductFromGlobalTicket(product))
    }
    function handleDestroyProduct(product){
        dispatch(deleteProductFromGlobalTicket(product))
    }
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
                    {match?.selected && <div className='ProductSelector'></div>}
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
        if(!(product.Departamento === 'GRANEL')){
            dispatch(addProductToGlobalTicket(product))
            document.getElementById('inputSearch').value = ''
            document.getElementById('inputSearch').focus()
            setState({
                ...state,
                matchList: []
            })
            state?.matchList?.length > 0 && setProductIndex(0)
            ticketProducts.forEach((element, i) => {
                if(element.id === product.id){
                    setProductIndex(ticketProducts.length - i - 1)
                }
            });

        }
        else{
            setState({...state, granelTab: true})
        }
    }
    function removeClicked(product){
        dispatch(removeProductFromGlobalTicket(product))
    }
    let productCard = (product, selected) => {
        return(<>
        <div className='productContainerTicketCreator'>
           { <span className='removeProductFromTicketCreator' onClick={() => {removeClicked(product)}}> - </span>}
            <div onClick={() => productClicked(product )} className='productCardTicketCreatorContainer'> 
                <div className='productsCTCQuantity'>{(!(product?.Departamento === 'GRANEL') ? product['quantity'] : product['quantity'] + 'gr'  )}</div>
                <div>{selected && '<'}</div>
                <div>
                    <div className='productsCTCName'>{product['Producto']}</div>
                    <div className='productsCTCPrice'>{(!(product?.Departamento === 'GRANEL') ? product['P. Venta'] : product['P. Venta'] * 1000 )}</div>
                </div>
            
                <div>
                    <div className='productsCTCTotal'>{(Number(product?.quantity) * Number((product['P. Venta'])[0]) === '$' ? product['P. Venta']?.slice(-1) : product['P. Venta'])}</div>
                </div>
            
            </div>
            <h1 onClick={() => {handleDestroyProduct(product)}}>X</h1>

        </div>
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
        
        let matches = ( user?.privileges === 'admin' ? allProducts : userProducts ).filter(product => {
          const regex = new RegExp(`^${searchText}`, 'gi')
          if(product){
              return product['Producto']?.match(regex) || product['Código']?.match(regex) || product['Departamento']?.match(regex)
          }
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
            dispatch(sellProducts({products: ticket, userId: user.id}))
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
                togglePaymentCheckout()
                // document.getElementById('submitTicket').click()
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
                togglePaymentCheckout()
                // document.getElementById('submitTicket').click()
            }
        }
    }
    function handleAddProduct2Ticket(e){
        e?.preventDefault()
        console.log(state);
        dispatch(fetchOneProduct({filter: "Código", value: state.searchValue, userId: user?.id}))
        console.log(selectedProduct);
    }
    function closeGranelTab(){
        setState({...state, granelTab: false})
    }
    useEffect(() => {
        // selectedProduct && dispatch(addProductToGlobalTicket(selectedProduct))
        if(selectedProduct["Producto"]){
            console.log(selectedProduct);
            if(selectedProduct?.Departamento !== 'GRANEL'){
                dispatch(addProductToGlobalTicket(selectedProduct))
                setState({...state, 
                    searchValue: '',
                    matchList: [],
                    inputSearch: ''
                })
                document.getElementById('inputSearch').value = ''

            }
            else{
                setState({...state,  granelTab: true})
            }
        }
    }, [selectedProduct])

    const TicketToPrint = () => {
        return (<>
            <div>
                <TicketForPrinting total = {state.total}></TicketForPrinting>
            </div>
        </>)
    }

    const handleOnAfterPrint = () => {
        console.log('DESPUES DE IMPRESION');
    }
    const handleOnBeforePrint = () => {
        console.log('ANTES DE IMPRESION');
    }
    return ( <>
        {productIndex}
        <div className='ticketCreator'>
            <div>
                {state.ticketType === 'out' ?  'VENDER' : 'RECIBIR'}
            
            </div>
    {/* SLIDER */}
        <label className="switch">
            {/* {JSON.stringify(state.searchValue)} */}
            <input id='switch' onClick={() => handleSwitch()} type="checkbox"/>
            <span className="slider"></span>
        </label>
        {JSON.stringify(date.toLocaleString())}
    {/*      */}
            <form onSubmit={(e) => handleAddProduct2Ticket(e) }>
                {
                    state.granelTab === false && <div>
                        <label className='formTicketCreatorInputProduct'>{ state.inputSearch && ('Nombre: ' + state.inputSearch) || 'Ingrese Código o Nombre'}</label>
                        <input onKeyDown={(e) => {handleKeyDown(e)}} autoComplete={'off'} id='inputSearch' name='inputSearch' type={'text'} placeholder='Nombre ó Código' onChange={(e) => {handleOnChange(e)}}></input>

                    </div>
                }
            </form>
            <form>
                <label className='formTicketCreatorName'>{JSON.stringify(user?.name)}</label>
                {ticketProducts?.length && ticketProducts?.map( (product, index) => productCard(product, index === ticketProducts.length-productIndex-1?true:false) )?.reverse() || 'Agregue algunos productos!'}
                <div>
                    <label className='formTicketCreatorTotal'>{ state.total && ('Total: ' +( '$' + state?.total) || '$0')}</label>
                </div>
                {productThumb()}
            </form>
            <button id='submitTicket' className='createTicketSubmitButton' onClick={ () => {f9()}}>CREAR TICKET</button>
            <h1 className='fixedTotal'>{state.total}</h1>
            {state.granelTab  && <div className='granelTabContainer'> 
                <button id='closegt' className='closeGranelTab' onClick={() => closeGranelTab()}>X</button>                
                <GranelTab product={state.matchList[productIndex]} weightFactor = {1000} closeCallback={() => setState({...state, granelTab: false})}></GranelTab> 
                
                </div>}
            
            {isCheckoutVisible && <div className='checkoutBoxContainer'> 
                <CheckoutTab 
                    total={state.total} 
                    afterCheckoutCallback={() => {document.location.reload()}} 
                    beforeCheckoutCallback={() => {submitTicket(state.ticketType)}} 
                    closeCallback={() => togglePaymentCheckout()} 
                    Component = {() => <TicketToPrint></TicketToPrint>} 
                    >
                </CheckoutTab></div>}
        </div>
    </> );
}

export default TicketCreator;