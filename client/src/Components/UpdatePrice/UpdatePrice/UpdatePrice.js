import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { counterDecrement, counterIncrement, editOneProduct, fetchAllProducts, fetchOneProduct, setCounter } from "../../../features/products/productSlicetest";
import './UpdatePrice.css'
import Catalog from "../../Catalog/Catalog";
import Draggable from 'react-draggable'
import { checkIfProductIsUpdated } from "./updateTools";
export default function UpdatePrice(){
    let todaysDate = new Date()
    let [state, setState] = useState({
        idInput: null,
        nameInput: null,
        priceInput: null,
        Producto: '',
        id: null,
        ['P. Venta']: null,
        lastDayUpdated: '',
        lastMonthUpdated: '',
        lastYearUpdated: '',
    })
    let idInput = state.idInput
    let nameInput = state.Producto
    let priceInput = state['P. Venta']
    let dispatch = useDispatch()
    let globalState = useSelector(state => state.products)
    let selectedProduct = useSelector(state => state.products.selectedProduct)
    let counterId = useSelector(state => state.products.counterId)
    useEffect(()=>{
        getProduct(counterId)
        document.getElementById('price').focus()
        document.getElementById('price').value = null
        document.getElementById('name').value = null
        document.getElementById('departament').value = null
        document.getElementById('id').value = null

    }, [counterId])
    useEffect(()=>{
        setState({
            ...state,
            lastDayUpdated: Number(selectedProduct['updatedAt']?.split('T')[0]?.split('-')[2]),
            lastMonthUpdated: Number(selectedProduct['updatedAt']?.split('T')[0]?.split('-')[1]),
            lastYearUpdated: Number(selectedProduct['updatedAt']?.split('T')[0]?.split('-')[0])
        })
    }, [selectedProduct])
    function getProduct(id){
        dispatch( fetchOneProduct({filter: 'id', value: id})  )

    }
    function handleOnSubmit(e){
        e.preventDefault && e.preventDefault()
        getProduct(idInput)
        dispatch(setCounter(Number(idInput)))
    }
    function handleInputOnChange(e){
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
            getProduct(selectedProduct.id)
            getAllProducts()

        })
    }
    function reUpdatePrice(){
        dispatch(editOneProduct({id: selectedProduct.id, findBy: 'P. Venta', infoUpdated: selectedProduct["P. Venta"] })).then(()=> {
            getProduct(selectedProduct.id)
            getAllProducts()
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
    
    return (<>
        <Draggable>
            <div className="editProductContainer">
                <form onSubmit={(e) => {handleOnSubmit(e)}}>
                    <input id="id" name="idInput" type={'text'} placeholder={selectedProduct.id} onChange= {(e) => {handleInputOnChange(e)}} ></input>
                </form>
                {/* <div>
                    {idInput}
                </div>
                <div>
                    {nameInput}
                </div>
                <div>
                    {priceInput}
                </div> */}
                <div>
                    <button className="previousProductToCheck" onClick={() => {decrementCounter() }}>
                        {'←'}
                    </button>
                    <div>
                        {selectedProduct.Producto}
                        <form name="Producto" onSubmit={(e)=> {handleOnEdit(e, 'Producto')}}>
                            <input id="name" placeholder="Nuevo Nombre" name="Producto" type={'text'} onChange={(e) => {handleInputOnChange(e)}} />
                        </form>
                        
                    </div>
                    <div>
                        {selectedProduct['P. Venta']}
                        <form name="P. Venta" onSubmit={(e)=> {handleOnEdit(e, 'P. Venta')}}>
                            <input id="price" placeholder="Nuevo Precio" name="P. Venta" type={'number'} onChange={(e)=> handleInputOnChange(e)} autofocus='autofocus' onKeyDown={(e)=>{handleKeyPress(e) }}  />
                        </form>

                    </div>
                    <div>
                        {selectedProduct['Departamento']}
                        <form name="Departamento" onSubmit={(e)=> {handleOnEdit(e, 'Departamento')}}>
                            <input id="departament" placeholder="Nuevo Departamento" name="Departamento" type={'text'} onChange={(e)=> handleInputOnChange(e)} />
                        </form>

                    </div>
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
                    <button className="nextProductToCheck" onClick={() => {incrementCounter() }}>
                        {'→'}
                    </button>
                    <div>
                        
                        {counterId}
                    </div>
                    <div>
                        {/* {JSON.stringify(globalState)} */}

                    </div>
                </div>
            </div>
        </Draggable>
        <Catalog editmode={true} filter={''} value={''} ></Catalog>
    </>)
}