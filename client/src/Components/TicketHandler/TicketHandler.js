import React from 'react';
import Tickets from './Tickets/Tickets';
import "./TicketHandler.css"
function TicketHandler() {
    return ( <>
        {/* <h1>Seleccionar Fecha de Tickets</h1> */}
        <div className='ticketFunctions'>
            {/* <input placeholder='ID' type={'text'} ></input> */}
            <Tickets></Tickets>
        </div>

    </> );
}

export default TicketHandler;