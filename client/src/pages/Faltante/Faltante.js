import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts, getMyProducts } from '../../features/products/productSlicetest';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import './Faltante.css'
function Faltante() {
    let dispatch = useDispatch()
    let nav = useNavigate()
    let userProducts = useSelector(state => state.products.userProducts) 
    let cookie = new Cookies()
    let user = cookie.get('user')
    useEffect(() => {
        if(user){
            getUserProducts()
        }
    }, [])
    let [state, setState] = useState({
        ls: 20,
        li: 0,
        currentDepartment: null 
    })
    let getUserProducts = () => {
        dispatch(getMyProducts({userId: user.id}))
    }
    function productSelector (li, ls){
        return userProducts?.filter(product => product.quantity >= li && product.quantity <= ls)?.sort((a, b) => a?.Producto[0] - b?.Producto[0])
    }
    useEffect(() => {
        dispatch(fetchAllProducts())
    }, [])
    function handleRangeChange(e){
        let selectedValue = e.target.value
        console.log(selectedValue)
        setState({...state,
            [e.target.name]: selectedValue
        })
    }

    //La siguiente función es usada para filtrar los productos de acuerdo a una llave y su valor
    // Esto debería ser llamando a una API sin embargo se muestra a continuación
    function filterBy(key, value, list){
        return list?.filter( element => {
            return element[key] === value
        })
    }

    // La siguiente funcion complementa la anterior, la utilizaremos para extraer los Departamentos
    // Devuelve una lista con los departamentos
    function departmentCounter(products){
        let departmentList = new Set()
        products?.map(product => {
            departmentList.add(product['Departamento'])
        })
        return Array.from(departmentList)?.sort()

    }

    function handleDepartmentOnChange(e){
        console.log(e.target.value);
        setState({...state, currentDepartment: e.target.value === 'TODOS' ? null : e.target.value})
    }

    function productCard(product){
        return ( <div className="faltanteInfoContainer">
                    <div className='faltanteName' onClick={()=>{ nav('/products/'+product.id) }} >{product?.Producto?.slice(0, 10)}</div>
                    <div>{product['P. Venta']}</div>
                    <div className='faltanteQuantity'>{product['quantity']}</div>                
            </div>)
    }
    return ( <>
    
        <header>
            Producto Faltante
        </header>

        <div>
            <div>
                <h3>Limite Superior</h3>
                {state.ls}
                <input value={state.ls} type="range" name='ls' id="marginRangeLS" min="0" max="20" onChange={(e) => handleRangeChange(e)} step="1"/>
            </div>
            <div>
                <h3>Limite Inferior</h3>
                {state.li}
                <input value={state.li} type="range" name='li' id="marginRangeLI" min="0" max="20" onChange={(e) => handleRangeChange(e)} step="1"/>
            </div> 
            <div>
                <h3>Departamento</h3>
                <select onChange={ e => handleDepartmentOnChange(e)} name="departments" id="deps">
                    <option value='TODOS'>TODOS</option>
                    {departmentCounter(userProducts)?.map(departamento => {
                        return <option value={departamento}>{departamento}</option>
                            
                    })}
                </select>
            </div>
            <div className='faltanteContainer'>

                {/* La siguiente linea de codigo muestra los productos filtrador por departamento si se selecciona uno, de otra manera devuelve todos los productos */}
                {( state.currentDepartment ? filterBy('Departamento', state.currentDepartment, productSelector(state.li, state.ls)): productSelector(state.li, state.ls))?.map(product => {
                    return (<div className='faltanteProductContainer'>
                        { productCard(product) }
                        
                        </div>)
                })}

            </div>
        </div>
    </> );
}

export default Faltante;