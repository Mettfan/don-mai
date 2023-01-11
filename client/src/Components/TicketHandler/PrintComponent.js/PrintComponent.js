import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import Tickets from '../Tickets/Tickets';
import './PrintComponent.css'
function PrintComponent(props) {
    const date = new Date()
    let [state, setState] = useState({
      ticketId: 0,
      currentDateTime: date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    })
    const ticketProducts = useSelector( state => state.products.ticketProducts)
    let dispatch = useDispatch()

    const ComponentToPrint = React.forwardRef((childProps, ref) => {
        return (
          <div ref={ref} className= 'printContainer' >
                {props.component}
          </div>
        );
      });
      function handleOnAfterPrint (){
        console.log('AFTER');
      }
      function handleOnBeforePrint (){
        console.log('BEFORE');
      }
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
      onAfterPrint: () => {handleOnAfterPrint()},
      onBeforePrint: () => {handleOnBeforePrint()}
    });
  
    return (
      <div className='componentToPrintContainer'>  
        {/* <button className="printButton" onClick={handlePrint}>COBRAR</button> */}
        <ComponentToPrint ref={componentRef} />
        <button className="printComponentButton" onClick={handlePrint}>{props?.buttonComponent}</button>
      </div>
    );
}

export default PrintComponent;