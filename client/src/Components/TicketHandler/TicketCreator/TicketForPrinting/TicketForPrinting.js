import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
function TicketForPrinting() {
    let ticketProducts = useSelector(state => state?.products?.ticketProducts)
    useEffect(() => {
        console.log(ticketProducts);
    }, [])
    return ( <>
        <div>
            <table>
                <thead>
                    {'TICKET'}
                </thead>
                <tr>
                    <th>C.</th>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Total</th>
                </tr>
                {ticketProducts?.map( product => {
                    let formattedPrice = product['P. Venta'][0] === '$' ? product['P. Venta']?.slice(1) : product['P. Venta']
                    return (<tr>
                        <td>{product?.quantity}</td>
                        <td>{product?.Producto}</td>
                        <td>{formattedPrice}</td>
                        <td>{Number(formattedPrice) * Number(product?.quantity)}</td>
                    </tr>)
                })}

            </table>
        </div>
    </> );
}

export default TicketForPrinting;