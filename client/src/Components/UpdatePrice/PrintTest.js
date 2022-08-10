import React, { useRef } from "react";
import { useReactToPrint } from 'react-to-print';


const ComponentToPrint = React.forwardRef((props, ref) => {
    return (
      <div ref={ref}>El papuchero.com</div>
    );
  });
export const Example = () => {
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
