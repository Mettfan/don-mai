import React from "react";
import Carrousel from "./Carrousel/Carrousel";
export default function Landing(){
    return <>
        <div>
            <div>
                <Carrousel text = 'Anuncio'></Carrousel>
            </div>
            <div>
                <Carrousel img = 'https://stpeterstoronto.ca/main/wp-content/uploads/2020/01/native-advertising-word-cloud.jpeg'></Carrousel>
            </div>
            <div>
                <Carrousel text = 'Anuncio' img = 'https://stpeterstoronto.ca/main/wp-content/uploads/2020/01/native-advertising-word-cloud.jpeg'></Carrousel>
            </div>
        </div>
    </>
}
