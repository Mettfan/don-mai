import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as XLSX from 'xlsx'
import { fetchOneProduct, postTicket } from '../../../../features/products/productSlicetest';
function UploadTickets(props) {
    let [uploadTickets, setUploadTickets] = useState(props.tickets)
    let ticketProducts = useSelector(state => state.products.ticketProducts)
    let selectedProduct = useSelector(state => state.products.selectedProduct)
    let [formattedTickets, setFormattedTickets] = useState([])
    let allProducts = useSelector(state => state.products.products)
    let dispatch = useDispatch()
    const readExcel =(file) => {
        const promise  = new Promise( ( resolve, reject ) => {
            const fileReader = new FileReader()
            fileReader.readAsArrayBuffer(file)
            fileReader.onload = (e) =>{
                const bufferArray = e.target.result
                const wb = XLSX.read( bufferArray , { type: 'buffer'});
                const wsname = wb.SheetNames[0]
                const ws = wb.Sheets[wsname]
                const data = XLSX.utils.sheet_to_json(ws)
                resolve(data)
            } 
            fileReader.onerror = ( error ) => {
                reject(error)
            }
        })
        promise.then((d) => {
            console.log(d);
            setUploadTickets(d)

            
            
        })

    }
    function saveNonFormattedTickets(nonFormattedTickets){
        let promise = new Promise((resolve, reject) => {
            let savedTickets = []
            let formattedTickets = []
            nonFormattedTickets?.forEach((ticket, index) => {

                let productKeys = Object.keys(ticket).filter(key => !isNaN(key))
                let formattedTicket = {products: [], user: ticket["user"], client: ticket["client"], description: ticket["description"], createdAt: ticket["createdAt"]}
                console.log(productKeys);

                productKeys.forEach(key => {
                    let decodedCode = String(ticket[String(key)]?.split(',')[1])
                    let decodedQuantity = String(ticket[String(key)]?.split(',')[0])
                    console.log(decodedCode, decodedQuantity);
                    let formattedTicketProduct = allProducts?.filter((product) =>  product["Código"] === String(ticket[String(key)]?.split(',')[1]) )["0"]
                    console.log(formattedTicketProduct);
                    formattedTicket["products"] = [...formattedTicket["products"], {...formattedTicketProduct, quantity: decodedQuantity}]
                    
                }) 
                console.log("formatted ticket: ", formattedTicket);
                formattedTickets = [...formattedTickets, formattedTicket]
            });
            resolve(formattedTickets)
        })
        promise.then((response) => {
            setFormattedTickets(response)
            response.forEach(ticket => {
                console.log('DONE: ' + JSON.stringify(ticket) );

            })
        })


    }
    function inputOnChange (e){
        console.log(e.target.files[0]);
        readExcel(e.target.files[0])
    }
    function postTickets(tickets){
        tickets.forEach(ticket => {
            uploadTicket({products: ticket['Productos'], total: 10, user: ticket['user'], client: ticket['client'], description: ticket['description']})
        })
    }
    function uploadTicket ({products, total, user, client, description}){
        dispatch(postTicket({products, total, user, client, description}))
    }
    return ( <>
    
        <input onChange={(e) => inputOnChange(e)} type="file" id = 'hoja' accept= ".xls, .xlsx"></input>
        <button onClick={() => saveNonFormattedTickets(uploadTickets)}>Load Tickets</button>
        {formattedTickets.length > 0 && <button onClick={() => postTickets(formattedTickets)}>Post Tickets</button>}
        {JSON.stringify(ticketProducts)}
        {formattedTickets?.map(ticket => {
            return (<div style={{border: "2px solid black"}}>
                <h3>{ticket["createdAt"]}</h3>
                <h4>{ticket["client"]}</h4>
                <h4>{ticket["user"]}</h4>
                {ticket["products"]?.map(product => {
                    return (<div style={{display: "flex"}}>

                        <h6 style={{color: "red"}}>{product["quantity"]}</h6>
                        <span>{product["Producto"]}</span>

                    </div>)
                })}

            </div>)
        })}

        

    </> );
}

export default UploadTickets;