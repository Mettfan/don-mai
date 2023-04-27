import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIncome } from '../../../../features/analytics/analyticSlice';
function Income() {
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(getIncome())
    }, [])
    let income = useSelector(state => state?.analytics?.income)
    return ( <>
    
        <div style={{
            backgroundColor: 'green',
            color: 'white',
            padding: '5px'
        }}>
            {'Income: ' + JSON.stringify(income.income)}
        </div>
    
    </> );
}

export default Income;