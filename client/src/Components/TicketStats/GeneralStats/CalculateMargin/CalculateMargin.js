import React, { useEffect, useState } from 'react';
import './CalculateMargin.css'
function CalculateMargin(props) {
    let invested = props.totalInvest
    let [analytic, setAnalytic] = useState({
        relativeMargin: 10,
        absoluteMargin: 0
    })
    useEffect(() => {
        setAnalytic({...analytic, absoluteMargin:  Number(invested?.total) * analytic.relativeMargin / 100 })
    }, [analytic.relativeMargin])
    function handleRangeChange(e){
        let selectedValue = e.target.value
        console.log(selectedValue)
        setAnalytic({...analytic, relativeMargin: selectedValue })
    }
    return ( <>
    
        <div className='calculateMarginContainer'>
            <div className='totalInvestedAnalytic'>
                {invested?.total}
            </div>
            <div className='marginValuesContainer'>
                <div className='relativeMarginAnalytic'>
                    {String(props.operator) + String(analytic?.relativeMargin) + "%" }
                </div>
                <div className='absoluteMarginAnalytic'>
                    {"(" + String(Math.round(analytic?.absoluteMargin)) + ")" }
                </div>
            </div>
            <input type="range" id="marginRange" min="0" max="20" onChange={(e) => handleRangeChange(e)} step="1"/>
            <div className='appliedMarginQuantityContainer'>
                {eval(String(invested?.total) + (String(props.operator) || '-') + String(Math.round(analytic?.absoluteMargin))) }
            </div>
        </div>
    
    </> );
}

export default CalculateMargin;