import React, { useEffect } from 'react';
import Tickets from './Tickets/Tickets';
import "./TicketHandler.css"
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';

function TicketHandler() {
    let cookie = new Cookies()
    let user = cookie.get('user')
    let nav = useNavigate()
    let currentURL = window.location
    useEffect(() => {
        if(String(currentURL.href)?.slice(-1) === '?'){
            nav('/tickets')
        }
        
    }, [currentURL])
    
    return ( <>
        {/* <h1>Seleccionar Fecha de Tickets</h1> */}
        <div className='ticketFunctions'>
            {Number(user?.kyu) >= 9 && <button className='goToTicketsStats' onClick={() => nav('/tickets/stats')}>STATS</button>}
            {/* <input placeholder='ID' type={'text'} ></input> */}
            <Tickets></Tickets>
        </div>

    </> );
}

export default TicketHandler;