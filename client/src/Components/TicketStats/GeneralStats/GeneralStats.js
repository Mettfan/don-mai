import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Income from './Income/Income';
import Outcome from './Outcome/Outcome';
import StatsMostBought from './StatsMostBought/StatsMostBought';
import StatsMostSold from './StatsMostSold/StatsMostSold';
import './GeneralStats.css'
function GeneralStats() {
    let tickets = useSelector(state => state.products.tickets.response)
    let [typeTicket, setTypeTicket] = useState('mostBought')
    function switchTypeTicket(){
        setTypeTicket( typeTicket === 'mostBought' ? 'mostSold' : 'mostBought')
    }

    return ( <>
    <div className='generalStatsContainer'>

        <button style={{
            display: 'flex',
            cursor: 'pointer'

        }} onClick={() => switchTypeTicket()}>SWITCH</button>
        <StatsMostSold analytic = {typeTicket} top={10} tickets = {tickets}></StatsMostSold>
        {/* Los siguientes componentes han sido abreviados en el anterior */}
        {/* <StatsMostSold  analytic = 'mostBought' top={10} tickets = {tickets}></StatsMostSold> */}
        {/* <StatsMostBought top={10} tickets = {tickets}></StatsMostBought> */}
        <div className='generalStatsIncomeandOutcome'>
            <Income></Income>
            <Outcome></Outcome>
        </div>
    </div>
    </> );
}

export default GeneralStats;