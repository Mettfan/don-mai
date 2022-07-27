import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
  selectProduct,
  productSelector,
  getProductByBarcode,
} from './counterSlice';
import styles from './Counter.module.css';
import { getProduct } from '../../redux/actions/productActions';
import Cookies from 'universal-cookie';
import { fetchAllProducts } from '../../features/products/productSlicetest';
export function Counter() {
  let cookie = new Cookies()
  let [state, setState] = useState({
    currentProduct: cookie.get('currentProduct'),
    reduxState: useSelector(state => state)
  })

  const count = useSelector(selectCount);
  const productState = useSelector( state => state)
  const reduxState = state.reduxState
  // const product = useSelector(productSelector(count || 1));
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;
  function pp (){
    
    dispatch(decrement())
    setState({...state, currentProduct: cookie.get('currentProduct')})
    dispatch(getProduct(count
      ))
    
  }
  function np (){
    dispatch(increment())
    
    dispatch(getProduct(count))
    setState({...state, currentProduct: cookie.get('currentProduct')})
  }
  function searchProduct(codigo_de_barras){
    guardarNumerito(incrementAmount)
    // console.log(state?.currentProduct['P. Venta']);
    console.log(codigo_de_barras);
    getProductByBarcode(codigo_de_barras)
    setState({...state, currentProduct: cookie.get('currentProduct')})

  }
  function guardarNumerito(numerito){
    setIncrementAmount(numerito)
    console.log(incrementAmount);
    dispatch(getProductByBarcode(numerito))
  }
  function handleKeyPress(event){
    console.log(event.keyCode);
    let keycode = event.keyCode
    if(keycode === 37){
      pp()
    }
    if(keycode === 39){
      np()
    }
    // if ( event.key === )
  }
  return (
    <>
    
      <div>
        <div className={styles.row}>
          <button
            className={styles.buttondecrement}
            aria-label="Decrement value"
            onClick={() => pp()}
          >
            -
          </button>

          <div className='valueRow'>
            <div className={styles.value}>{state?.currentProduct?.id}</div>
            <div className={styles.value}>{state?.currentProduct?.Código}</div>
            <div className={styles.value}>{state?.currentProduct?.Producto}</div>
            {/* <div className={styles.value}>{state?.currentProduct["P. Venta"] || null}</div> */}
          </div>

          {/* <span className={styles.value}>{JSON.stringify(product)}</span> */}
          <button
            className={styles.buttonadd}
            aria-label="Increment value"
            onClick={() => np()}
            onKeyDown = { (e) => handleKeyPress(e)}
          >
            +
          </button>
        </div>
        <div className={styles.row}>
          <input
            className={styles.textbox}
            aria-label="Set increment amount"
            value={incrementAmount}
            onChange={(e) => {guardarNumerito(e.target.value)}}
          />
          <div></div>
            
        
          <button
            className={styles.button}
            onClick = {() => {searchProduct('70707070')}}
            // onClick={() => dispatch(incrementPrice(`+$`))}
          >
            BUSCAR
          </button>
          {/* <button
            className={styles.asyncButton}
            onClick={() => dispatch(incrementAsync(incrementValue))}
          >
            Add Async
          </button> */}
          {/* <button
            className={styles.button}
            onClick={() => dispatch(incrementIfOdd(incrementValue))}
          >
            Add If Odd
          </button>
          {JSON.stringify(reduxState)} */}
        </div>
      </div>

      <div>
        {JSON.stringify(productState)}
      </div>
      <button onClick={ () => dispatch(fetchAllProducts()) }>{'BRING ALL'}</button>
    </>
  );
}
