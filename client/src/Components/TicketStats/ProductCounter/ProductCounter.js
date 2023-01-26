import React, { useState } from 'react';
import './ProductCounter.css'
function ProductCounter(props) {
    let ticket = props?.ticket || null
    let [ zoom, setZoom ] = useState(10)
    // function zoomIn(percent){
    //     setZoom( Number(zoom + Number(percent) ))
    // }
    // function zoomOut(percent){
    //     setZoom( Number(zoom - Number(percent) ))
    // }
    return ( <>
    
    <div className='productCounterContainer'>
        {
            ticket?.Productos?.map((product) => {
                return (<div className='productCounterBackground'>
                    <span style={{ 
                        //La siguiente linea muestra en verde la entrada de dinero: 'Si el tipo de ticket no es de salida, se pinta en rojo'
                        'backgroundColor':  ticket?.description !== 'out' ? 'red' : 'green',
                        'color': 'white',
                        'padding': `${String(zoom) + 'px'}`,
                        'width': '100%',
                        
                        }}>{product?.Producto}</span>    
                    <div>
                        {
                            [...Array(product?.quantity + 1).keys()].map((element) => {
                                return(<>
                                
                                    <span className='productTick'>
                                        
                                        -
                                    </span>
                                
                                </>)
                            })
                            
                        }

                    </div>



                </div>)
            })
        }

    </div>
    
    </> );
}

export default ProductCounter;