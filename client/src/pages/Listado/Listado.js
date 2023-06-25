import React from 'react';
import PrintList from '../../Components/PrintList/PrintList';
import { useSelector } from 'react-redux';
function Listado() {
    let currentProducts = useSelector(state => state?.products?.ticketProducts)
    return ( <>

        <div>
            <PrintList products = {currentProducts}></PrintList>
            {/* {JSON.stringify(currentProducts)} */}
        </div>
    
    </> );
}

export default Listado;