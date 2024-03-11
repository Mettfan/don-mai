import React from "react";
import './Carrousel.css'
export default function Carrousel (props) {
    return (<>
        <div style={{...props.option}}>
            
            {props.img && <img alt="" style={{...props?.imgOptions}} src={props.img}/>}
            {props.fixedComponent && <div style={{...props?.fixedComponentOptions}}>{props.fixedComponent}</div>}
            {props.text && props.text }
        </div>
    
    </>)
}