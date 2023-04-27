import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getTicketById } from '../../features/products/productSlicetest';
import PrintComponent from '../TicketHandler/PrintComponent.js/PrintComponent';
import './TicketDetail.css'
import LOGODONMAY from '../../Assets/LOGODONMAY.png'
import printerPng from '../../Assets/printer.png'

function TicketDetail() {
    let params = useParams()
    let ticket = useSelector(state => state.products.ticket)
    let dispatch = useDispatch()
    let nav = useNavigate()
    useEffect(() => {
        dispatch(getTicketById(params?.id))
    },[])
    let ReturnToTickets = () =>{
        nav('/tickets')
    }
    let TicketToPrint = ({ticket}) => {
        return (<>
        {/* <div className='ticketContainer'> */}

            <table className='ticketTable'>
                    <tr className='ticketTableTitles'>
                        <td>{'Cant.'}</td>
                        <td>{'Concepto'}</td>
                        <td>{'Precio'}</td>
                        
                    </tr>
                    {ticket?.Productos?.map(producto => {
                        return <tr className='ticketsProductRow'>
                        <td>{Number(producto?.quantity)}</td>
                        <td>{producto?.Producto?.substring(0, 20) }</td>
                        <td>{producto['P. Venta'] && producto['P. Venta']}</td>

                    </tr>
                    })}
                
            </table>
                <div className="totalTicket">
                {'A pagar: ' + '$' + ticket?.Total}            
                {/* <div>
                    {'Pagado: ' + '$' + state.payment}
                </div>
                <div>
                    {'Cambio: ' + '$' + state.change}
                </div> */}
            </div>
                {/* <img src={LOGODONMAY} className= 'ticketsImage'></img>
                <div className='ticketsName'>
                    {ticket?.user}
                </div>
                <div className='ticketsProducts'>
                    {ticket?.Productos?.map(producto => {
                        return (<div className='ticketProductContainer'>
                            <div>
                                {producto['Producto']}
                            </div>
                            <div>
                                {producto['quantity']}
                            </div>
                            <div>
                                {producto['P. Venta']}
                                </div>
                        </div>)
                    })}
                    </div>
                    <div className='ticketsTotal'>
                    {ticket['Total']}
                </div> */}

        
            {/* </div> */}
        </>)
    }
    return ( <>
    
        <div className='ticketDetailContainer'>
            {/* {JSON.stringify(params)} */}
            {
                ticket?.id
                ? 
                <PrintComponent buttonComponent= {<img src={printerPng} style={{
                    'width': '50px'
                }}></img>} component = {<TicketToPrint ticket = { ticket }></TicketToPrint>} ></PrintComponent>
                : 
                <ReturnToTickets></ReturnToTickets>            
            }

        </div>
    
    </> );
}

export default TicketDetail;