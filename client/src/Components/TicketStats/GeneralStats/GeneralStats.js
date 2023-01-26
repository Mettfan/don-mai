import React from 'react';
import { useSelector } from 'react-redux';
import StatsMostSold from './StatsMostSold/StatsMostSold';
function GeneralStats() {
    let tickets = useSelector(state => state.products.tickets.response)
    

    return ( <>


        <StatsMostSold top={10} tickets = {tickets}></StatsMostSold>
    </> );
}

export default GeneralStats;