import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PrintComponent from '../TicketHandler/PrintComponent.js/PrintComponent';
import GeneralStats from './GeneralStats/GeneralStats';
import ProductCounter from './ProductCounter/ProductCounter';
import './TicketStats.css'
import { downloadExcel } from '../Convert/Convert';
import { getMyProducts } from '../../features/products/productSlicetest';
import Cookies from 'universal-cookie';
function TicketStats() {
    let [productCounterEntry, setProductCounterEntry] = useState(0)
    let [productCounterOut, setProductCounterOut] = useState(0)
    let [ticketsType, setTicketsType] = useState('entry')
    let userProducts = useSelector( state => state.products.userProducts)
    let cookie = new Cookies()
    let user = cookie.get('user')
    let dispatch = useDispatch()
    
    let getUserProducts = () => {
        dispatch(getMyProducts({userId: user.id}))
    }
    useEffect(() => {
        if(user){
            getUserProducts()
        }
    }, [])
    // useEffect(() => {
    //     if(tickets){
    //         setProductCounter(calculateTotalQuantity(tickets, ticketsType)) 
    //     }
    // }, [productCounter])

    let [printComponentPosition, setPrintComponentPosition] = useState(1)
    let tickets = useSelector(state => state.products.tickets.response)
    function calculateTotalQuantity(tickets, type){
        let promise = new Promise((resolve, reject) => {
            let accumulator = 0
            tickets.forEach(ticket => {
                ticket['description'] === type && ticket["Productos"].forEach(product => {
                    accumulator +=  Number(product['quantity'])
                })
                console.log(accumulator);
            });
            console.log("TOTAL ACCUMULATED: " + accumulator);
            resolve(accumulator)
        })
        promise.then((value) => {
            type === 'entry' ? setProductCounterEntry(value) : setProductCounterOut(value)
            console.log("resolved: " + value);
        })
        // return accumulator

    }
    function handleCalculate(month){
        setProductCounterEntry(calculateTotalQuantity(filtrarTicketsPorMes(month), 'entry')) 
        setSelectedButton(month)
    }
    function handleCalculateComparedMonth(month){
        setProductCounterOut(calculateTotalQuantity(filtrarTicketsPorMes(month), 'out'))
        setComparedButton(month)
    }
    function filtrarTicketsPorMes(month){
        return tickets?.filter(ticket => ticket["createdAt"]?.split('T')[0]?.split('-')[1] == Number(month))
    }
    let monthSelector = useState(3)
    let [selectedButton, setSelectedButton] = useState(null)
    let [comparedButton, setComparedButton] = useState(null)
    function downloadStock(){
        const current = new Date();
        const date = `${current.getDate()}-${current.getMonth()+1}-${current.getFullYear()}`;
        // No. / quantity / Producto / P. Calculado / Total 
        let total = 0
        let cleanStock = []
        let sortedStock = []
        sortedStock = [...userProducts]?.sort((x, y) => x?.Producto?.localeCompare(y?.Producto))
        
        let stockTemplate = sortedStock?.map((product) => {
            // gUARDA P VENTA EN UNA VARIABLE Y RESTALE EL 10 PORCIENTO
            let price = product['P. Venta']
            let buyPrice = product['P. Compra']
            let formattedBuyPrice = (!buyPrice?.includes('$')  ? Number(buyPrice) : Number(buyPrice.slice(1)))
            let formattedPrice = (!price?.includes('$')  ? Number(price) : Number(price.slice(1)))
            let calculatedPrice = formattedBuyPrice || (formattedPrice - (formattedPrice * 0.10 )) // Aqui se le cambia el porcentaje a calcular
            let totalCalculated = (calculatedPrice* Number(product?.quantity) )
            total += totalCalculated
            if (product?.quantity !== null && product?.quantity > 0){
                return { Codigo: product?.Código, Cantidad: product?.quantity, Producto: product?.Producto || '?', ["P. Venta"]: price || '?' , ['P. Calculado']: calculatedPrice  || '?', Total: totalCalculated, Acumulativo: total   }
            }
        })
        cleanStock = stockTemplate.filter(product => product !== undefined)
        cleanStock = cleanStock?.map((product, index) => {
            return {N: index + 1, ...product}
        })
        console.log(cleanStock);
        // downloadExcel(cleanStock, 'Inventario: ' + date )
    }
    let printTickets = () => {
        return (<div  >

        {filtrarTicketsPorMes(3)?.map(ticket => {
            return(<div style={{fontSize: "xx-small"}}>
                <div style={{backgroundColor:'gold'}}>
                    {ticket["createdAt"]}
                </div>
                {ticket["Productos"]?.map(product => {

                    return(<div >
                        <div>

                            {product["Producto"]}
                        </div>
                        <div>

                            {Number(product["quantity"]) + 1}
                        </div>
                        <div>

                            {product["P. Venta"]}
                        </div>
                    </div>)
                })}

            </div>)
        })?.slice(0, 1)}
        {/* <div>
            Total {' '+ ticketsType + ' tickets'}: {' ' + productCounter}
        </div> */}
        <div>
            <div>Calculando suma de productos vendidos y comprados de mes {' ' + selectedButton } contra productos de mes {" " + comparedButton} </div>        
        </div>
        {Array.from(Array(4).keys()).map((month) => {
            return (<div>
            {JSON.stringify(month)}
            <button onClick={() => handleCalculate(month)}>{"Calculate Entry Mes " +  String(Number(month))}</button>
                {/* {totalEntryQuantity}
                {totalOutQuantity} */}
            <button onClick={() => handleCalculateComparedMonth(month)}>{"Calculate Out Mes " + String(Number(month))}</button>


            </div>)
        })}
        <div>
            
            {'Calculated Entry Products' + String(productCounterEntry)}
        </div>
        <div>

            {'Calculated Out Products' + String(productCounterOut)}
        </div>
        <div  style={{position: "relative", left: "-100%"}}>
            <GeneralStats/>
        </div>
    </div>)
}
    
    return ( <>
        {/* <button onClick={() => setPrintComponentPosition('01')} >0</button>
        <button onClick={() => setPrintComponentPosition('03')} >1</button> */}
        {/* {JSON.stringify(tickets)} */}
        <PrintComponent buttonComponent= {<div>Imprimir Tickets</div>} component = {printTickets()}></PrintComponent>
        <button onClick={() => {downloadStock()}}>DESCARGAR STOCK</button>
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