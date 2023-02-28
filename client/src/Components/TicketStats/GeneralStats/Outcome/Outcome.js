import { color } from '@mui/system';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOutcome } from '../../../../features/analytics/analyticSlice';
function Outcome() {
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(getOutcome())
    }, [])
    let outcome = useSelector(state => state?.analytics?.outcome)
    return ( <>
    
        <div style={{
            backgroundColor: 'red',
            color: 'white',
            padding: '5px'
        }}>
            { 'Outcome: ' + JSON.stringify(outcome.outcome)}
        </div>
    
    </> );
}

export default Outcome;