import React, { useState } from 'react';
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
} from './counterSlice';
import styles from './Counter.module.css';
import { getProduct } from '../../redux/actions/productActions';

export function Counter() {
  const count = useSelector(selectCount);
  const product = useSelector(productSelector(count || 1));
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;
  function pp (){
    
    dispatch(decrement())
    
  }
  function np (){
    dispatch(increment())
    
    dispatch(getProduct(count))
  }
  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => pp()}
        >
          -
        </button>
        {/* <span className={styles.value}>{count}</span> */}
        <span className={styles.value}>{JSON.stringify(product)}</span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => np()}
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(incrementValue))}
        >
          Add Async
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch(incrementIfOdd(incrementValue))}
        >
          Add If Odd
        </button>
      </div>
    </div>
    
  );
}
