import React from 'react';
function Pagaré(props) {
    let name = props.name // nombre del deudor
    let date = new Date().toDateString() // fehca que se firmó
    let promised = props.promised // fecha a pagar
    let tax = props.tax // porcentaje en numero entero
    let accumulated = props.accumulated // total de la unidad convertida a la moneda de su nacionalidad multiplicada por el porcentaje a la fevcha 
    return ( <>
    
    <div>   
            <h2>HOY</h2>
        <div className='date'>
            {date && date}
        </div>

        <div className='name'>
            {name && name}

        </div>
        <div className='promised'>
            {promised && promised}

        </div>
        <div className='tax'>
            {tax && tax}
        </div>
        <div className='acumulated'>
            {accumulated && accumulated}             
        </div>

    </div>
    
    </> );
}

export default Pagaré;