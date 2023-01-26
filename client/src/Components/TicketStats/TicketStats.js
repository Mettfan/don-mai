import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import GeneralStats from './GeneralStats/GeneralStats';
import ProductCounter from './ProductCounter/ProductCounter';
import './TicketStats.css'
function TicketStats() {
    let tickets = useSelector(state => state.products.tickets.response)

    return ( <>
        <GeneralStats/>
        <div className='ticketStatsContainer'>
            {tickets?.map(ticket => {
                return (<div className='ticketStatsMargin'>

                    <ProductCounter ticket = {ticket} ></ProductCounter>

                </div>
                )
            }).reverse()}

            {/* Zoom Controllers */}
        </div>
    
    </> );
}

export default TicketStats;