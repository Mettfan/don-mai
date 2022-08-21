import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';


import styles from './Counter.module.css';
import { getProduct } from '../../redux/actions/productActions';
import Cookies from 'universal-cookie';
import { addProductToGlobalTicket, fetchAllProducts, fetchOneProduct, nextProduct, previousProduct } from '../../features/products/productSlicetest';
// import { fetchProductByBarcode } from '../../features/products/productSlicetest';
export function Counter() {
  let cookie = new Cookies()
  let [state, setState] = useState({
    currentProduct: cookie.get('currentProduct'),
    reduxState: useSelector(state => state),
    searchValue: '',
    displayedProduct: {},
    matchList: []
  })

  // const count = useSelector(selectCount);
  const productState = useSelector( state => state)
  const allProducts = useSelector( state => state.products.products)
  const selectedProduct = useSelector( state => state.products.selectedProduct)
  // const selectedProduct = useSelector( state => state.products.selectedProduct)
  // const product = useSelector(productSelector(count || 1));
  const dispatch = useDispatch();
  let selectedProductCounter = useSelector( state => state.products.productSelectedCounter)
  function pp () {
    console.log('previousPage');
    dispatch(previousProduct())
  }
  function np () {
    console.log('nextPage');
    dispatch(nextProduct())
  }
  
  async function handleOnChange (e){
    console.log(e.target.value);
    setState({
      searchValue: e.target.value
    })
    searchStates(e.target.value)
  }
  function searchStates(searchText){
    
    let matches = allProducts.filter(product => {
      const regex = new RegExp(`^${searchText}`, 'gi')
      return product['Producto'].match(regex) || product['Código'].match(regex)
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
  
  function onSearch(e) {
    e?.preventDefault && e.preventDefault()

    productState?.products?.products && productState?.products?.products?.map(product => {
      console.log(product);
      if (product.Código == state.searchValue){
        setState({
          ...state,
          displayedProduct: product
        })
      }      
    })
    dispatch(fetchOneProduct( {filter: 'barcode' , value: state.searchValue }))
    document.getElementById('inputBarcode').value = ''
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
            
            <div className='valueRow'>
              <div className={styles.value}>
                <div>
                  { productState?.products?.selectedProduct['Producto']}
                </div>
                <div>
                  { productState?.products?.selectedProduct['P. Venta']}
                </div>
                <div>
                  { productState?.products?.selectedProduct['Código']}
                </div>
                <div>
                  { productState?.products?.selectedProduct['id']}
                </div>
              </div>
              {/* {JSON.stringify(productState.products.selectedProduct)} */}
            </div>
          {/* <button
            className={styles.buttonadd}
            aria-label="Increment value"
            onClick={() => np()}
            onKeyDown = { (e) => handleKeyPress(e)}
          >
            +
          </button> */}
        </div>
        <div className={styles.row}>

          <form onSubmit={(e) => onSearch(e)} autoComplete={'off'}>
            <div className={styles.inputSearch}>
              {/* {JSON.stringify(selectedProductCounter)} */}
              <input

                aria-label="Set increment amount"
                id={'inputBarcode'}
                onChange={(e) => {handleOnChange(e)}}
                autoFocus={true}
                onKeyDown={(e) => {handleKeyPress(e)}}
                autoComplete={false}
                />  
              <input
                type={'submit'}
                value={'BUSCAR'}
                className={'searchButton'}
                
                // onClick = {() => {searchProduct('70707070')}}
                />

            </div>
            <div className={styles.matchList}>
              {state.matchList && state.matchList.map(match => {
                return (<>
                <div className={styles.matchContainer} onClick={()=>{dispatch(fetchOneProduct( {filter: 'id' , value: match.id }))}}>
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
              })}
            </div>
              
          </form>

        </div>
      </div>

      <div>
        {/* {JSON.stringify(productState.products.products)} */}
      </div>
      {/* <button onClick={ () => dispatch(fetchAllProducts()) }>{'BRING ALL'}</button> */}
      
    </>
  );
}
