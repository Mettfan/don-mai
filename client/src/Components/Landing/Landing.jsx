import React from "react";
import Carrousel from "./Carrousel/Carrousel";
import LOGODONMAY from '../../Assets/LOGODONMAY.png'
import RECIBO from '../../Assets/RECIBO.png'
import CALCULATOR from '../../Assets/calculator.png'
import BOXES from '../../Assets/boxes.png'
import BARCODE from '../../Assets/barcode.png'
import CATALOGO from '../../Assets/catalogo.png'
import GRAPH from '../../Assets/graph.png'
import USER from '../../Assets/user.png'
import './Landing.css'
import { useNavigate } from "react-router-dom";
export default function Landing(){
    let nav = useNavigate()
    let firsAdvertOptions = {
        backgroundColor: '#FFD449',
        border: 'solid black 3px',
        width: '80%',
        height: '400px',
        margin: '20px',
        objectFit: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px'

    }
    let firstImgOptions = {
        width: 'auto',
        // backgroundColor: 'red',

    }
    let firstComponentOptions = {
        // backgroundColor: 'blue',
        position: 'relative',
        bottom: '100px',
        display: 'flex',
        justifyContent: 'center'
            
    }
    let reciboOptions = {
        width: '30%'
    }
    let calculatorOptions = {
        width: '30%'
    }
    let boxesOptions = {
        width: '30%'
    }
    let barcodeOptions = {
        width: '50%'
    }
    let catalogoOptions = {
        width: '30%'
    }
    let graphOptions = {
        width: '30%'
    }
    let userOptions = {
        width: '30%'
    }
    let firstFixComponent = ( ) => {
        return (<>
        
            <div>

                <div>
                    <h1 className="adverTitle">Registrate</h1>
                </div>

            </div>
        
        </>)
    }
    let secondAdvertOptions = {
        backgroundColor: '#FFD449',
        border: 'solid black 3px',
        width: '80%',
        height: '400px',
        margin: '20px',
        objectFit: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px'

        
    }

    let secondComponentOptions = {
        // backgroundColor: 'blue',
        position: 'relative',
        bottom: '100px',
        display: 'flex',
        justifyContent: 'center'
            
    }
    let secondFixComponent = ( ) => {
        return (<>
        
            <div>

                <div>
                    <h1>Usa las Herramientas que ofrece el sistema DM</h1>
                </div>

            </div>
        
        </>)
    }


    // A continuacion se realiza un listado de las tools a mostrar
    let tools = [
        {
            img: RECIBO,
            imgOptions: reciboOptions,
            option: {
                // marginInBlock-: '10px'
            },
            title: 'Tickets',
            goto: '/recibo'
        },
        {
            img: BARCODE,
            imgOptions: barcodeOptions,
            option: {
                // marginInBlock-: '10px'
            },
            title: 'Control de Productos',
            goto: '/barcode'
        },
        {
            img: CALCULATOR,
            imgOptions: calculatorOptions,
            option: {
                // marginInBlock-: '10px'
            },
            title: 'Cuentas Rápidas',
            goto: '/calculator'
        },
        {
            img: BOXES,
            imgOptions: boxesOptions,
            option: {
                // marginInBlock-: '10px'
            },
            title: 'Control de Inventario',
            goto: '/boxes'
        },
        {
            img: CATALOGO,
            imgOptions: catalogoOptions,
            option: {
                // marginInBlock-: '10px'
            },
            title: 'Catalogo Personal',
            goto: '/catalog'
        },
    ]
    let comingTools = [
        {
            img: GRAPH,
            imgOptions: graphOptions,
            option: {
                // marginInBlock-: '10px'
            },
            title: 'Analisis',
            goto: '/analisis'
        },
       
    ]
    let logs = [
        {
            option: {...firsAdvertOptions},
            img: USER,
            imgOptions: {...firstImgOptions},
            fixedComponent: firstFixComponent,
            secondFixComponent: secondFixComponent,
            secondComponentOptions: firstComponentOptions,
            fixedComponentOptions: {...firstComponentOptions},
            goto: '/register'
        },
        {
            option: {...secondAdvertOptions},
            img: LOGODONMAY,
            imgOptions: {...firstImgOptions},
            fixedComponent: () => <h3 className="adverTitle">Inicia Sesión</h3>,
            secondFixComponent: secondFixComponent,
            secondComponentOptions: firstComponentOptions,
            fixedComponentOptions: {...firstComponentOptions},
            goto: '/login'
        },
    ]
    

    return <>
        <div>
        {secondFixComponent()}
        <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                position: 'relative',
                bottom: '50px',
                flexWrap: 'wrap',
                marginTop: '70px'
            }}>
                {tools.map((tool) => {
                    return(
                        <div onClick={() => {nav(tool.goto)}} className="toolContainer">
                            <h3>{tool?.title || null}</h3>
                            <Carrousel 
                                img = {tool.img}
                                imgOptions = {{...tool.imgOptions}}
                                option = {{...tool.option}}
                            ></Carrousel>
                        </div>
                    )
                })}
                {/* Aqui arriba se muestra un listado de las herramientas de DM */}
            </div>
            <div>
                <Carrousel text = 'PROXIMAMENTE...' ></Carrousel>
                {comingTools.map((tool) => {
                    return (
                        <div onClick={() => {nav(tool.goto)}} className="toolContainer">
                            <Carrousel 
                                img = {tool.img}
                                imgOptions = {{...tool.imgOptions}}
                                option = {{...tool.option}}
                            ></Carrousel>
                            <h3>{tool?.title || null}</h3>

                        </div>)
                })}
            </div>
            <div className="logsContainer">
            {logs.map((log) => {
                    return(
                        <div onClick={() => {nav(log.goto)}} className="logContainer">
                            <Carrousel 
                                img = {log.img}
                                imgOptions = {{...log.imgOptions}}
                                option = {{...log.option}}
                            ></Carrousel>
                            <Carrousel 
                                options = {{...log.secondAdvertOptions}} 
                                // img = {LOGODONMAY}
                                // imgOptions = {{...firstImgOptions}}
                                fixedComponent = {log.fixedComponent()}
                                fixedComponentOptions = {{...log.secondComponentOptions}}
                            ></Carrousel>
                        </div>
                    )
                })}
                <div>
                    
                </div>
                <div>
                    
                </div>

            </div>
            
        </div>
    </>
}
