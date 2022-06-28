import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Cookies from "universal-cookie";
import './Delivery.css'

let productos = [
    {
        nombre: 'Sachicha',
        precio: '20',
        image: 'https://cdn.pixabay.com/photo/2020/01/24/14/43/sausage-4790386_960_720.png'
    },
    {
        nombre: 'Salsa',
        precio: '10',
        image: 'https://www.pngmart.com/files/17/Red-Sauce-PNG-Photos.png'
    },
    {
        nombre: 'Coca',
        precio: '2',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Coca-Cola_bottle_cap.svg/2048px-Coca-Cola_bottle_cap.svg.png'
    }

]

function Delivery(props){
    let cookie = new Cookies()
    useEffect( () => {
        cookie.set('valorPrueba', 'popo')
         
        

    })
    let [state, setState] = useState('NINGUN PRODUCTO SELECCIONADO')
    let [cookies, setCookie] = useState(cookie.get('valorPrueba'))
    function mostrarProducto(e){
        console.log(e.target.value);
        setState(e.target.value)



    }

   
    return (<>
        <div className="divPrueba">
            <button className="botonCarrito" onClick={() => {console.log('DISTE CLICK') } } > 
                <img className="carrito" src="https://cdn-icons-png.flaticon.com/512/107/107831.png" alt="JA VALISTE" ></img> 
            </button>
            <select onChange={(e) => { mostrarProducto(e)} }>
                {productos.map( (producto) => {
                    return (<>
                        <option value = {producto.nombre}>{producto.nombre + '  $' + producto.precio} </option>
                    </>)
                } )}
            </select>
            
            <img src=
            {productos.find( (producto) => {
                return producto.nombre === state
            } )?.image}
            ></img>
            {cookies
            }
        </div>

       
    
    
    
    
    </>)

}

export default Delivery