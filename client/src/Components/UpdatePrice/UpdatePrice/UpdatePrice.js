import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { counterDecrement, counterIncrement, editOneProduct, fetchOneProduct } from "../../../features/products/productSlicetest";

export default function UpdatePrice(){
    let todaysDate = new Date()
    let [state, setState] = useState({
        idInput: null,
        nameInput: null,
        priceInput: null,
        Producto: '',
        id: null,
        ['P. Venta']: null
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
    }, [counterId])
    function getProduct(id){
        dispatch( fetchOneProduct({filter: 'id', value: id})  )

    }
    function handleOnSubmit(e){
        e.preventDefault && e.preventDefault()
        getProduct(idInput)
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
        dispatch(editOneProduct({id: counterId, findBy: e.target.name, infoUpdated: state[e.target.name] })).then(()=>{
            getProduct(counterId)

        })
    }
    return (<>
        <form onSubmit={(e) => {handleOnSubmit(e)}}>
            <input name="idInput" type={'text'} placeholder={'ID'} onChange= {(e) => {handleInputOnChange(e)}} ></input>
        </form>
        <div>
            {idInput}
        </div>
        <div>
            {nameInput}
        </div>
        <div>
            {priceInput}
        </div>
        <div>
            <button onClick={() => {decrementCounter() }}>
                -
            </button>
            <div>
                {selectedProduct.Producto}
                <form name="Producto" onSubmit={(e)=> {handleOnEdit(e, 'Producto')}}>
                    <input placeholder="Nuevo Nombre" name="Producto" type={'text'} onChange={(e) => {handleInputOnChange(e)}} />
                </form>
                
            </div>
            <div>
                {selectedProduct['P. Venta']}
                <form name="P. Venta" onSubmit={(e)=> {handleOnEdit(e, 'P. Venta')}}>
                    <input placeholder="Nuevo Precio" name="P. Venta" type={'number'} onChange={(e)=> handleInputOnChange(e)} />
                </form>

            </div>
            <div>
                {selectedProduct['Departamento']}
                <form name="Departamento" onSubmit={(e)=> {handleOnEdit(e, 'Departamento')}}>
                    <input placeholder="Nuevo Departamento" name="Departamento" type={'text'} onChange={(e)=> handleInputOnChange(e)} />
                </form>

            </div>
            <div>
                <div>Ultima vez Actualizado: </div>
                    <div>
                        {selectedProduct && 'Día: ' + Number(selectedProduct['updatedAt']?.split('T')[0]?.split('-')[2])}
                    </div>
                    <div>
                        { selectedProduct && 'Mes: ' + Number(selectedProduct['updatedAt']?.split('T')[0]?.split('-')[1])}
                    </div>
                    <div>
                        { selectedProduct &&  'Año: ' + Number(selectedProduct['updatedAt']?.split('T')[0]?.split('-')[0])}
                    </div>
                <div>
                    {todaysDate.getMonth()+1 > Number(selectedProduct['updatedAt']?.split('T')[0]?.split('-')[1]) ? 'Producto Desactualizado' : 'Producto Actualizado'   }
                </div>
            </div>
            <button onClick={() => {incrementCounter() }}>
                +
            </button>
            <div>
                
                {counterId}
            </div>
            <div>
                {JSON.stringify(globalState)}

            </div>
        </div>
    </>)
}