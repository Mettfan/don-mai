import React from 'react';
import './Membership.css'
function Membership(props){
    return (<>
    <div>
        <h1>MEMBRESIA</h1>
        <div id='plansContainer'>

            <div className='planTitle'>Plan 1</div>
            <div className='planTitle'>Plan 2</div>
            <div className='planTitle'>Plan 3</div>
        </div>
        <img id='perrito' src='https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQkrjYxSfSHeCEA7hkPy8e2JphDsfFHZVKqx-3t37E4XKr-AT7DML8IwtwY0TnZsUcQ' />
    </div>
    </>)
}
export default Membership;