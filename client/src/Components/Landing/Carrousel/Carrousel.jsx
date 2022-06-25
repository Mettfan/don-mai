import React from "react";
import './Carrousel.css'
export default function Carrousel (props) {
    return (<>
        <div className="carrouselBg">
            
            {props.img && <img className="advImg" src={props.img}/>}
            {props.text && props.text }
        </div>
    
    </>)
}