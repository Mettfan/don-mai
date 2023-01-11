import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTickets } from '../../../features/products/productSlicetest';
import Calendar from 'react-calendar'
import './Tickets.css'
import PrintComponent from '../PrintComponent.js/PrintComponent';
import { useNavigate } from 'react-router-dom'

function Tickets() {
    useEffect(() => {
        getAllTickets()
    }, [])
    let dispatch = useDispatch()
    let tickets = useSelector(state => state.products.tickets.response)
    let getAllTickets = () => {
        console.log(tickets);
        dispatch(fetchTickets())
    }
    let nav = useNavigate()
    const date = new Date()
    let [ticketDate, setTicketDate] = useState(date)

    let ticketCard = (ticket) => {
        return (<>
            <div onClick={() => {nav(`/tickets/${ticket?.id}`)}} className='ticketsContainer'>
                <div className='ticketId'>{ticket?.id}</div>
                <div className='ticketProducts'>{ticket?.Productos && ticket?.Productos.map((product => (<div className='productTicketCard'>
                    <div className='productTicketsQuantity'>{product["quantity"]}</div>
                    <div className='productTicketsName'>{product["Producto"]}</div>
                    <div className='productTicketsPrice'>{product["P. Venta"]}</div>
                    </div>)))}
                    <div className='ticketTotal'>{ticket["Total"]}</div>
                </div>
                <div className='ticketCreatedAt'>{ticket["createdAt"].split('T')[0]}</div>
                {/* <div className='ticketCreatedAt'>{date.getDate()}</div> */}
                {/* <div className='ticketUpdatedAt'>{ticket["updatedAt"]}</div> */}
                {/* <PrintComponent component = {<TicketToPrint ticket = { ticket }></TicketToPrint>} ></PrintComponent> */}
                </div>
        </>)
    }
    return ( <>
        {/* {ticketDate.getMonth()+1} */}
        {/* {JSON.stringify(tickets)} */}
        {/* {tickets?.length && JSON.stringify(tickets?.filter(ticket => Number(ticket["createdAt"].split('T')[0].split('-')[1]) ))} */}
        <div className='ticketMiniApp'>

            <div className='calendarMiniApp'>
                <h1>Seleccionar Fecha de Tickets</h1>
                <div className='calendarTicketContainer'>
                    <div className='calendarTicket'>
                        {/* {JSON.stringify(ticketDate)} */}
                        <Calendar onChange={setTicketDate} value={ticketDate} defaultView={'month'} />
                    </div>
                </div>
            </div>

                <div className='allTicketsContainer'>

                    {tickets?.length && tickets?.filter(ticket => Number(ticket["createdAt"].split('T')[0].split('-')[1]) === ticketDate.getMonth() + 1 )?.filter(ticket => Number(ticket["createdAt"].split('T')[0].split('-')[2]) === ticketDate.getDate())?.map((ticket) => {
                        
                        return (<>
                           {ticketCard(ticket)}

                        </>)
                    }).reverse()}
                </div>
        </div>

    </> );
}

export default Tickets;