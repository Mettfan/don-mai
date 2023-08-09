import React, { useState } from 'react';
import PrintComponent from '../TicketHandler/PrintComponent.js/PrintComponent';
import './PrintList.css'
function PrintList({products}) {
    let [title, setTitle] = useState('')
    let Lista = () => {
        return (<div className='tablePrintContainer'>
            <h3>{title}</h3>
            <table>
                <tr>
                    <th>Q</th>
                    <th>Producto</th>
                    <th>C.$</th>
                    <th>V.$</th>
                    <th>TOTAL</th>
                </tr>
                {products?.length > 0 && products?.map((product) => {
                    return (<tr>
                        <td>{product?.quantity}</td>
                        <td>{product?.Producto}</td>
                        <td contentEditable={true}></td>
                        <td contentEditable={true}>{  String(product['P. Venta'][0]) === '$' ? product['P. Venta'].slice(1) : product['P. Venta'] }</td>
                        <td contentEditable={true}></td>
                        {/* <td>{product['Código']?.slice(-6, -1)}</td> */}
                        
                    </tr>)
                } ) }
            </table>

        </div>)
    }
    return ( <>

        <div>
            <h2>Imprimir Lista</h2>
            <input onChange={(e) => {setTitle(e.target.value)}}></input>
            <PrintComponent buttonComponent = {'IMPRIMIR'} component = {<Lista></Lista>}></PrintComponent>
        </div>
    
    </> );
}

export default PrintList;