import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from 'react-to-print';
import Mickey from '../../Assets/Mickey.png'
import './PrintTest.css'

export const Example = (propsRoot) => {
  const date = new Date()
  let [state, setState] = useState({
    ticketId: 0,
    currentDateTime: date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
  })
  useEffect(()=>{
    setInterval(() => {
      setState({...state,
        currentDateTime: date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
        })
    }, 1000);
  },[state.currentDateTime])

  const currentDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
  const currentDateTime = state.currentDateTime
  const ComponentToPrint = React.forwardRef((props, ref) => {
      return (
        <div ref={ref} className= 'mainTicketContainer' >
          <div className="informacionFiscal">
            
            <b className="ticketTitle" >'Tiendas Don May'</b>
            <div>Miguel Torres Colindres</div>
            <div>R.F.C.: TOCM520906G97 </div>
            <div>Melchor Ocampo 301</div>
            <div>San Antonio la Isla, Méx</div>
            <div>C.P.: 52280</div>
            <div>Tel: 722 371 1324</div>
            <div>{currentDate}</div>
            <div>{currentDateTime}</div>
            <div>Ticket  Id{' '+state.ticketId}</div>
            <img className="mickeyTicket" src={Mickey}/>
          </div>
          <div className="divisorContainerStart"></div>
          <div>
            {propsRoot.ticket}
          </div>
          <div className="divisorContainerEnd"></div>
          <div>

            <div>www.donmay.com.mx</div>
          </div>
        </div>
      );
    });
    function handleOnAfterPrint (){
      window.location.reload()
    }
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => {handleOnAfterPrint()}
  });

  return (
    <div>  
      <ComponentToPrint ref={componentRef} />
      <button className="printButton" onClick={handlePrint}>PrintTicket</button>
    </div>
  );
};
