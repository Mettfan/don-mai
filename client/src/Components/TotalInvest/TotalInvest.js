import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalInvested } from '../../features/products/productSlicetest';
function TotalInvest() {
    let dispatch = useDispatch()
    let [state, setState] = useState({
        investType: 'Compra'
    })
    let switchInvestType = () => {
        setState({
            ...state,
            investType: state.investType === 'Venta' ? 'Compra' : 'Venta'
        })
    }
    useEffect(() => {
        dispatch(getTotalInvested(state.investType))
    }, [state])
    let totalInvest = useSelector( state => state.products.totalInvest)
    return ( <>
    
        <div className='totalInvestContainer'>
            {'TOTAL INVESTED IS: ' + totalInvest?.total}
        </div>
        <div className='switchInvestType'>
            <button onClick={() => switchInvestType()}>
                {state.investType}
            </button>
        </div>

    </> );
}

export default TotalInvest;