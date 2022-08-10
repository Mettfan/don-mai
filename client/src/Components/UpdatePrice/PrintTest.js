import React, { useRef } from "react";
import { useReactToPrint } from 'react-to-print';
import Mickey from '../../Assets/Mickey.png'
import './PrintTest.css'

export const Example = (propsRoot) => {
  const ComponentToPrint = React.forwardRef((props, ref) => {
      return (
        <div ref={ref} className= 'mainTicketContainer' >
          <div>
            Tiendas Don May
            <img className="mickeyTicket" src={Mickey}/>
          </div>
          <div>
            {propsRoot.ticket}
          </div>
          <div>
            Calle Melchor Ocampo #301
            <div>donmai.com</div>
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
