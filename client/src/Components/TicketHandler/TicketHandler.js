import React from 'react';
import Tickets from './Tickets/Tickets';
import "./TicketHandler.css"
import { useNavigate } from 'react-router';
import { Cookie } from '@mui/icons-material';
function TicketHandler() {
    let cookie = new Cookie()
    let user = cookie.get('user')
    let nav = useNavigate()
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