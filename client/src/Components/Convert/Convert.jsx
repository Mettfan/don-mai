import React from "react";
import { useState } from "react";
import { useSelector  } from "react-redux/es/exports";
import * as XLSX from 'xlsx'
import Barcode from "react-barcode";
import './Convert.css'
import { addProducts } from "../../redux/actions/productActions";
import { useDispatch } from "react-redux";
import { PDFExport } from "@progress/kendo-react-pdf";
import { postProduct } from "../../features/products/productSlicetest";
// import { JsonToExcel } from "react-json-to-excel"
// import {fs} from 'fs';
// import { Readable } from 'stream';
// XLSX.set_fs(fs);
// XLSX.stream.set_readable(Readable);
export function downloadExcel (data)  {
    const fileName = 'Respaldo.xlsx';

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Respaldo');

    XLSX.writeFile(wb, fileName);
  };

export default function Convert () {
    let pdf = React.createRef()
    let dispatch = useDispatch()
    let selectedFile;
    let [ state, setState ] = useState({
        productos: null,
        li: 0,
        ls: 9,
        status: useSelector( status => status)
    })
    let status = state.status
    let productos = state.productos
    let li = state.li
    let ls = state.ls
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
            setState({...state, productos: d})

            
            
        })

    }
    function saveProducts(){
        if (productos){
            saveAsPDF()
        }
        
    }
    function uploadProducts(){
        if(productos){
            dispatch(postProduct(productos))
            console.log(status);
            
        }
    }
    function nextPage(){
        ls < productos?.length && setState({...state, li: state.li + 9, ls: state.ls + 9})
    }
    
    function previousPage(){
        li > 0 && setState({...state, li: state.li - 9, ls: state.ls - 9})
    }
    
    
    function inputOnChange (e){
        console.log(e.target.files[0]);
        selectedFile = e.target.files[0];
        readExcel(e.target.files[0])
    }

    function saveAsPDF() {
        if (!pdf.current){
            return
        }
        pdf.current.save()
    }


    return ( <> 
        {
            !productos && <div>
                <button onClick={ () => downloadExcel([{"wawa": "añeñe", "quita": "bomba"}])}>Crear Copia de Base </button>
            </div>
        }
      
        <input onChange={(e) => inputOnChange(e)} type="file" id = 'hoja' accept= ".xls, .xlsx"></input>
        {productos && <div>
            <button onClick={ () => saveProducts()}>Guardar Productos y Etiquetar</button>
            <button onClick={ () => uploadProducts()}>Subir Productos</button>
        </div>}
        <PDFExport fileName = 'barcodes.pdf' paperSize = 'A4' margin={'0cm'} ref= {pdf}>

            {
                <div className="products">
                    {/* { status && JSON.stringify(status)} */}

                    {productos && productos?.slice(li, ls)?.map( (producto) => {
                        return (<div className="productContainer">
        
                            <div>
                                <div>
                                    <Barcode 
                                        value = {producto.Código} 
                                        width = {3} 
                                        height = {100}
                                    />
                                </div>
                                {producto.Producto + ' > '}
                                {producto["P. Venta"]}
                            </div>
                            <div> 
                                -
                            </div>
        
                        </div>)
                    })}
                </div>
            }
        </PDFExport>
        {
            productos && 
            <div>
                <button onClick={() => previousPage()} className='buttonPrevious'>Previous</button>
                <button onClick={() => nextPage()} className='buttonNext'>Next</button>
            </div>
        }
    </>)
}

