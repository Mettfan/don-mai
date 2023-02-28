import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { destroyTicket, fetchTickets } from '../../../features/products/productSlicetest';
import Calendar from 'react-calendar'
import './Tickets.css'
import PrintComponent from '../PrintComponent.js/PrintComponent';
import { useNavigate } from 'react-router-dom'
import { downloadExcel } from '../../Convert/Convert';
import { readExcel } from '../../Convert/Convert';
import TicketCreator from '../TicketCreator/TicketCreator';
import Cookies from 'universal-cookie';
import DownloadIcon from '@mui/icons-material/Download';
function Tickets() {
    let cookie = new Cookies()
    let user = cookie.get('user')
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
    let [ticketsUpload, setTicketsUpload] = useState([])
    function onDeleteTicket(id, user){
        dispatch(destroyTicket(id, user?.email))
    }
    let ticketCard = (ticket) => {
        let ticketDate = new Date(ticket?.createdAt)
        return (<>
            <div onClick={() => {nav(`/tickets/${ticket?.id}`)}} className='ticketsContainer'>
                <div className='ticketId'>{ticket?.id}</div>
                <span>{JSON.stringify(ticketDate.toLocaleString())}</span>
                <div className='ticketProducts'>{ticket?.Productos && ticket?.Productos.map((product => (<div className='productTicketCard'>
                    <div className='productTicketsQuantity'>{product["quantity"]}</div>
                    <div className='productTicketsName'>{product["Producto"]}</div>
                    <div className='productTicketsPrice'>{product["P. Venta"]}</div>
                    </div>)))}
                    <div className={ ticket?.description === 'out' ? 'ticketTotalOut' : 'ticketTotalEntry'}>
                        <span  style={{
                            // 'display': 'flex',
                            'flexDirection': 'row-reverse',
                            'justifyContent': 'center',
                            'width': '10%',
                            'alignItems': 'center',
                            'cursor': 'pointer',
                            'position': 'relative',
                            'right': "40%",
                            'padding': "5px",
                            'color': 'white'


                        }} onClick={() => {onDeleteTicket(ticket?.id, user)}} >x</span>
                        <span style={{
                            // 'backgroundColor': ticket?.description === 'entry' ? 'red' : 'rgb(81, 208, 81)',
                            'padding': '5px',

                        }}>
                            {ticket["Total"]}
                        </span>

                    </div>
                </div>
                <div className='ticketCreatedAt'>{ticket["createdAt"].split('T')[0]}</div>
                {/* <div className='ticketCreatedAt'>{date.getDate()}</div> */}
                {/* <div className='ticketUpdatedAt'>{ticket["updatedAt"]}</div> */}
                {/* <PrintComponent component = {<TicketToPrint ticket = { ticket }></TicketToPrint>} ></PrintComponent> */}
                </div>
        </>)
    }
    let currentTickets = () => tickets?.filter(ticket => Number(ticket["createdAt"].split('T')[0].split('-')[1]) === ticketDate.getMonth() + 1 )?.filter(ticket => Number(ticket["createdAt"].split('T')[0].split('-')[2]) === ticketDate.getDate())
    let currentTicketsCards = () => {
        return currentTickets()?.map((ticket) => {
                        
            return (<>
               {ticketCard(ticket)}
    
            </>)
        }).reverse()
    }
    let selectedFile;
    function fileOnChange (e){
        console.log(e.target.files[0]);
        selectedFile = e.target.files[0];
        readExcel(e.target.files[0]).then(result => {
            console.log(result)
            setTicketsUpload(result)
        })
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
                        {tickets?.length && <button className='ticketDownloadButton' onClick={() => downloadExcel(currentTickets())} ><DownloadIcon></DownloadIcon></button>}
                        {/* EXCEL UPLOAD TICKETS PROTOTYPE */}
                        {/* <input onChange={(e) => fileOnChange(e)} type="file" id = 'hoja' accept= ".xls, .xlsx"></input>
                        <div>
                            <h3>Tickets a Subir: </h3>
                            {ticketsUpload?.map((ticket) => {
                                return (ticketCard(ticket))
                            })}
                        </div> */}
                        <div>
                            <TicketCreator></TicketCreator>
                        </div>
                    </div>
                </div>
            </div>

                <div className='allTicketsContainer'>

                    {tickets?.length && currentTicketsCards()}
                </div>
        </div>
    </> );
}

export default Tickets;