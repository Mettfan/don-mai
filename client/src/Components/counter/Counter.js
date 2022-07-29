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
// import { fetchProductByBarcode } from '../../features/products/productSlicetest';
export function Counter() {
  let cookie = new Cookies()
  let [state, setState] = useState({
    currentProduct: cookie.get('currentProduct'),
    reduxState: useSelector(state => state),
    searchValue: '',
    displayedProduct: {}
  })
  // const count = useSelector(selectCount);
  const productState = useSelector( state => state)
  const allProducts = useSelector( state => state.products.products)
  // const product = useSelector(productSelector(count || 1));
  const dispatch = useDispatch();

  function pp () {
    console.log('previousPage');
  }
  function np () {
    console.log('nextPage');
  }
  
  function handleOnChange (e){
    console.log(e.target.value);
    setState({
      searchValue: e.target.value
    })
  }
  function onSearch() {

    productState?.products?.products?.map(product => {
      console.log(product);
      if (product.Código == state.searchValue){
        setState({
          ...state,
          displayedProduct: product
        })
      }      
    });
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
              <div className={styles.value}>
                <div>
                  { state.displayedProduct && JSON.stringify(state.displayedProduct['Producto'])}
                </div>
                <div>
                  { state.displayedProduct && JSON.stringify(state.displayedProduct['P. Venta'])}
                </div>
                <div>
                  { state.displayedProduct && JSON.stringify(state.displayedProduct['Código'])}
                </div>
                <div>
                  { state.displayedProduct && JSON.stringify(state.displayedProduct['id'])}
                </div>
              </div>
            </div>
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
            
            onChange={(e) => {handleOnChange(e)}}
          />
          <div></div>
            
        
          <button
            onClick={( ) => {onSearch()}}
            className={styles.button}
            // onClick = {() => {searchProduct('70707070')}}
          >
            BUSCAR
          </button>
        </div>
      </div>

      <div>
        {JSON.stringify(productState.products.products)}
      </div>
      <button onClick={ () => dispatch(fetchAllProducts()) }>{'BRING ALL'}</button>
      
    </>
  );
}
