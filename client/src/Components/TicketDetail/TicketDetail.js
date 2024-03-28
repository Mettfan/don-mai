import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getTicketById } from '../../features/products/productSlicetest';
import PrintComponent from '../TicketHandler/PrintComponent.js/PrintComponent';
import './TicketDetail.css'
import LOGODONMAY from '../../Assets/LOGODONMAY.png'
import printerPng from '../../Assets/printer.png'
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import { editOneTicket } from '../../features/products/productSlicetest';

function TicketDetail() {
    let params = useParams()
    let ticket = useSelector(state => state.products.ticket)
    let dispatch = useDispatch()
    let nav = useNavigate()
    const [ticketid, setTicketId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCredit = (creditData) => {
        dispatch(editOneTicket(creditData));
        setIsModalOpen(false);
        window.location.reload();
      };

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
            <div className='totalTicket'>
                {'Estado: ' + ticket.description}
            </div>
            {ticket.description === "pending" ? <div className='totalTicket'>Deudor: {ticket?.client}</div> : null}
            <div className="totalTicket">
                {'A pagar:  $' + ticket?.Total}            
            </div>
            <div className="totalTicket">
                {'User: ' + ticket?.user}            
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
                <PrintComponent buttonComponent= {<img alt='' src={printerPng} style={{
                    'width': '50px'
                }}></img>} component = {<TicketToPrint ticket = { ticket }></TicketToPrint>} ></PrintComponent>
                : 
                <ReturnToTickets></ReturnToTickets>            
            }
<button
            onClick={(e) => {
              e.stopPropagation();
              setTicketId(ticket.id);
              setIsModalOpen(true);
            }}
          >
            Cambiar estado
          </button>
        </div>
        <ConfirmationModal
            TicketId={ticketid}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleCredit}
            question="¿Desea pagar a credito?"
          />
    </> );
}

export default TicketDetail;