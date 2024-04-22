import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductToStock, counterDecrement, counterIncrement, editOneProduct, fetchAllProducts, fetchOneProduct, setCounter } from "../../../features/products/productSlicetest";
import './UpdatePrice.css'
import Catalog from "../../Catalog/Catalog";
// import Draggable from 'react-draggable'
import { checkIfProductIsUpdated } from "./updateTools";
import TotalInvest from "../../TotalInvest/TotalInvest";
import Cookies from "universal-cookie";
export default function UpdatePrice(){
    let todaysDate = new Date()
    let cookie = new Cookies()
    let user = cookie.get('user')
    let [state, setState] = useState({
        idInput: null,
        nameInput: null,
        priceInput: null,
        Producto: '',
        id: null,
        ['P. Venta']: null,
        ['P. Compra']: null,
        lastDayUpdated: '',
        lastMonthUpdated: '',
        lastYearUpdated: '',
        pieces: null,
        
    })
    let idInput = state.idInput
    // let nameInput = state.Producto
    // let priceInput = state['P. Venta']
    let dispatch = useDispatch()
    // let globalState = useSelector(state => state.products)
    let selectedProduct = useSelector(state => state.products.selectedProduct)
    let counterId = useSelector(state => state.products.counterId)
    useEffect(()=>{
        getProduct(counterId)
        document.getElementById('id').focus()
        document.getElementById('price').value = null
        // document.getElementById('name').value = null
        document.getElementById('departament').value = null
        document.getElementById('id').value = null
        
    }, [counterId])
    useEffect(()=>{
        if(selectedProduct?.id){
            document.getElementById('price').focus()
            
        }
        setState({
            ...state,
            lastDayUpdated: Number(selectedProduct['updatedAt']?.split('T')[0]?.split('-')[2]),
            lastMonthUpdated: Number(selectedProduct['updatedAt']?.split('T')[0]?.split('-')[1]),
            lastYearUpdated: Number(selectedProduct['updatedAt']?.split('T')[0]?.split('-')[0])
        })
    }, [selectedProduct])
    function getProduct(barcode){
        dispatch( fetchOneProduct({filter: 'Código', value: barcode, userId: user?.id})  )

    }
    function handleOnSubmit(e){
        e.preventDefault && e.preventDefault()
        getProduct(idInput)
        dispatch(setCounter(Number(idInput)))
    }
    function handleInputOnChange(e){
        console.log(state[e.target.name]);
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    function incrementCounter(){
        
        dispatch(counterIncrement())
    }
    function decrementCounter(){
        dispatch(counterDecrement())
    }
    function handleOnEdit(e, findBy){
        e.preventDefault && e.preventDefault()
        dispatch(editOneProduct({id: selectedProduct.id, findBy: e.target.name, infoUpdated: state[e.target.name] })).then(()=>{
            getProduct(selectedProduct['Código'])
            getAllProducts()

        })
    }
    function reUpdatePrice(){
        dispatch(editOneProduct({id: selectedProduct.id, findBy: 'P. Venta', infoUpdated: selectedProduct["P. Venta"] })).then(()=> {
            getProduct(selectedProduct['Código'])
            getAllProducts()
        }).then(() => {
            window.location.reload()
        })
    }
    function getAllProducts(){
        dispatch( fetchAllProducts() )
    }
    function handleKeyPress(e){
        let keyCode = e.keyCode
        if(keyCode === 37){
            decrementCounter()
        }
        if(keyCode === 39){
            incrementCounter()
        }
        console.log(e.keyCode);
    }
    function addStock(e){
        e?.preventDefault && e.preventDefault()
        dispatch(addProductToStock({productBarcode: selectedProduct['Código'], quantity: state.pieces, id: selectedProduct['id']})).then(()=>{
            getProduct(selectedProduct['Código'])
            getAllProducts()

        })
    }
    
    return (<>
            <div className="editProductContainer">
            <div className="editContainer">
                <form onSubmit={(e) => {handleOnSubmit(e)}} autoComplete='off'>
                    <input id="id" name="idInput" type={'text'} placeholder={selectedProduct.id} onChange= {(e) => {handleInputOnChange(e)}} ></input>
                </form>
                {

                    (<div>
                        <div>
                            {'Producto: ' + selectedProduct.Producto}
                            {/* <form name="Producto" onSubmit={(e)=> {handleOnEdit(e, 'Producto')}}>
                                <input id="name" placeholder="Nuevo Nombre" name="Producto" type={'text'} onChange={(e) => {handleInputOnChange(e)}} />
                            </form> */}
                            
                        </div>
                        <div>
                            {'Precio: ' + selectedProduct['P. Venta']}
                            <form name="P. Venta" onSubmit={(e)=> {handleOnEdit(e, 'P. Venta')}}>
                                <input id="price" placeholder="Nuevo Precio" name="P. Venta" type={'number'} onChange={(e)=> handleInputOnChange(e)} autofocus='autofocus' onKeyDown={(e)=>{handleKeyPress(e) }}  />
                            </form>

                        </div>
                        <div>
                            {'Departamento: ' + selectedProduct['Departamento']}
                            <form name="Departamento" onSubmit={(e)=> {handleOnEdit(e, 'Departamento')}}>
                                <input id="departament" placeholder="Nuevo Departamento" name="Departamento" type={'text'} onChange={(e)=> handleInputOnChange(e)} />
                            </form>

                        </div>
                        <div>
                            {'Cantidad: ' + selectedProduct['quantity']}
                            <form name="quantity" onSubmit={(e)=> {handleOnEdit(e, 'quantity')}}>
                                <input id="quantity" placeholder="Editar Inventario" name="quantity" type={'number'} onChange={(e)=> handleInputOnChange(e)} />
                            </form>
                            <form name="pieces" onSubmit={(e)=> {addStock(e)}}>
                                <input id="pieces" placeholder="Agregar Piezas a Inventario" name="pieces" type={'number'} onChange={(e)=> handleInputOnChange(e)} />
                            </form>
                            {/* {JSON.stringify(globalState.response)} */}

                        </div>
                        {/* Siguiente fragmento deshabilitado por error en produccion (No se edita correctamente) */}
                        {/* <div>
                            {'Precio de Compra: ' + selectedProduct['P. Compra']}
                            <form name="P. Compra" onSubmit={(e)=> {handleOnEdit(e, 'P. Compra')}}>
                                <input id="P. Compra" placeholder="Nuevo precio de compra" name="P. Compra" type={'text'} onChange={(e)=> handleInputOnChange(e)} />
                            </form>
                        </div> */}

                    

                        <div>
                            {/* <div>Ultima vez Actualizado: </div> */}
                                {/* <div>
                                    {selectedProduct && 'Día: ' + state.lastDayUpdated }
                                    </div>
                                    <div>
                                    { selectedProduct && 'Mes: ' + state.lastMonthUpdated}
                                    </div>
                                    <div>
                                    { selectedProduct &&  'Año: ' + state.lastYearUpdated}
                                </div> */}
                            <div>
                                {checkIfProductIsUpdated(state.lastMonthUpdated, state.lastDayUpdated, todaysDate.getMonth()+1, todaysDate.getDate())}
                            </div>
                        </div>
                        <button onClick={() => {reUpdatePrice()}}>Reupdate</button>
                        {/* <button className="nextProductToCheck" onClick={() => {incrementCounter() }}>
                            {'→'}
                        </button> */}
                        {/* <div>
                            
                            {selectedProduct.quantity}
                        </div> */}
                        <div>
                            {/* {JSON.stringify(globalState)} */}

                        </div>
                    </div>)

                }
                <Catalog items={12} editmode={true} filter={''} value={''} ></Catalog>
            </div>
            {  user?.privileges === 'admin' &&  <TotalInvest></TotalInvest>}
        </div>
    </>)
}