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
    const SkipPrint = React.forwardRef((childProps, ref) => {
        return (
          <div ref={ref} className= 'printContainer' >
                <div>
                  SkIPPEDpRINT
                </div>
          </div>
        );
      });
      async function handleOnAfterPrint (){
        console.log('AFTER');
        props?.afterPrintCallback && props?.afterPrintCallback() 
        
      }
      function handleOnBeforePrint (){
        console.log('BEFORE');
        props?.beforePrintCallback && props?.beforePrintCallback()
      }
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
      onAfterPrint: () => {handleOnAfterPrint()},
      onBeforePrint: () => {handleOnBeforePrint()}
    });
    let [isPrintable, setPrintable] = useState(true)
    function handleOnPrintChange(e){
      console.log(e.target.value);     
      let isSet = e.target.value === 'on' ? true : false
    e && setPrintable(isSet)
  }
      
    return (
      <div className='componentToPrintContainer'>  
        {/* <button className="printButton" onClick={handlePrint}>COBRAR</button> */}
        {
          isPrintable ? <div>
            <input value={ document.getElementById('isPrintable') ? document.getElementById('isPrintable') : false } id='isPrintable' type='checkbox' name='isPrintable' onChange={(e) => handleOnPrintChange(e)}></input>
            <ComponentToPrint ref={componentRef} />
          </div>
          :
          <div>
            <SkipPrint ref={componentRef} />
            NOPRINTED
          </div>
        }
        
        <button id='printComponent' className="printComponentButton" onClick={handlePrint}>{props?.buttonComponent}</button>
      </div>
    );
}

export default PrintComponent;