import React, { useRef } from "react";
import { useReactToPrint } from 'react-to-print';
import Mickey from '../../Assets/Mickey.png'
import './PrintTest.css'

export const Example = (propsRoot) => {
  const date = new Date()
  const currentDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
  const currentDateTime = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();;
  const ComponentToPrint = React.forwardRef((props, ref) => {
      return (
        <div ref={ref} className= 'mainTicketContainer' >
          <div>
            
            <div className="ticketTitle" >Tiendas Don May</div>
            <div>R.F.C.: TOCM520906 </div>
            <div>{currentDate}</div>
            <div>{currentDateTime}</div>
            <div>San Antonio la Isla</div>
            <div>Melchor Ocampo #301</div>
            <div>C.P.: 52280</div>
            <div>Tel: 722 371 1324</div>
            <img className="mickeyTicket" src={Mickey}/>
          </div>
          <div className="divisorContainerStart"></div>
          <div>
            {propsRoot.ticket}
          </div>
          <div className="divisorContainerEnd"></div>
          <div>

            <div>donmay.com</div>
          </div>
        </div>
      );
    });
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <ComponentToPrint ref={componentRef} />
      <button onClick={handlePrint}>Print this out!</button>
    </div>
  );
};
