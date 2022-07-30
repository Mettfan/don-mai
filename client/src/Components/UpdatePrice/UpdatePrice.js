import React, { useState } from "react";
import { getProduct } from "../../Components/counter/counterSlice";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import { Counter } from "../counter/Counter";
export function UpdatePrice(){
    let cookie = new Cookies()
    // let currentProduct = cookie.get('currentProduct')
    
    let [state, setState] = useState({
        pageIndex: 0,
        currentProduct: cookie.get('currentProduct')
    })
    let pageIndex = state.pageIndex
    function reloadAfter(sec){
        setTimeout(()=> {
            window.location.reload()
        }, sec*1000)
    }
    function nextPage(){
        
        setState({ 
            ...state,
            pageIndex: ++pageIndex 
        })
        dispatch(getProduct(pageIndex))
        reloadAfter(2)
        // window.location.reload()
        // console.log('CURRENT: '+ currentProduct );
    }
    function previousPage(){
        setState({
            ...state,
            pageIndex: --pageIndex 
        })
        dispatch(getProduct(pageIndex))
        reloadAfter(2)
        // window.location.reload()
    }
    let dispatch = useDispatch()
    // function miFuncionChida(){
    //     console.log('CACA POPO');
    // }
    return ( <>
    <Counter></Counter>
    Update Price
    <button onClick={()=>{ previousPage() } }>previous</button>
    {pageIndex}
    <button onClick={()=>{ nextPage() } }>next</button>
    <div>
        {/* {JSON.stringify(state.currentProduct)} */}
        <div>
                <div>
                    {/* {state?.currentProduct?.Producto} */}
                </div>
                <div>
                    {/* {state?.currentProduct["P. Venta"]} */}
                </div>
                {/* <img src={state.currentProduct.image}/> */}
            </div>

        {/* <button onClick={()=>{miFuncionChida()}}>MI BOTON CHIDO</button> */}
    </div>
        </>)
}