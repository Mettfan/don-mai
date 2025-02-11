import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToGlobalTicket,
  destroyTicket,
  fetchFilteredTickets,
  fetchTickets,
} from "../../../features/products/productSlicetest";
import Calendar from "react-calendar";
import Switch from "react-switch";
import "./Tickets.css";
import { useNavigate } from "react-router-dom";
import TicketCreator from "../TicketCreator/TicketCreator";
import Cookies from "universal-cookie";
import GranelTab from "../../GranelTab/GranelTab";

function Tickets() {
  let nav = useNavigate();
  let cookie = new Cookies();
  let user = cookie.get("user");
  let userTickets = useSelector((state) => state.products.userTickets);
  const date = new Date();
  let [ticketDate, setTicketDate] = useState(date);
  let [showCalendar, setShowCalendar] = useState(false);


  let dispatch = useDispatch();
  let [state, setState] = useState({
    granelTab: false
  })
  useEffect(() => {
    if(userTickets){
      setState({...state, mostSoldList: mostSoldToday()})

    }
  }, [userTickets, ticketDate])
  useEffect(() => {
    if(state.granelTab === true){
      // document.getElementById('inputSearch')?.remove()
      setTimeout(() => {
        document.getElementById('granelInput')?.focus()
        console.log("Delayed for 1 second.");
      }, 1000);
      
    }
  }, [state.granelTab])
  function productClicked(product){
          if(!(product.Departamento === 'GRANEL')){
              dispatch(addProductToGlobalTicket(product))
          }
          else{
              setState({...state, granelTab: true})
          }
      }
  function closeGranelTab(){
    setState({...state, granelTab: false})
  }
  const [filteredUserTickets, setFilteredUserTickets] = useState([]);
  let userProducts = useSelector((state) => state?.products?.userProducts);
  const getAllTickets = useCallback(() => {
    dispatch(fetchTickets());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserTickets = useCallback(() => {
    dispatch(fetchFilteredTickets({ filter: "user", value: user?.name }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getAllTickets();
      await getUserTickets();
    };
    fetchData();
  }, [getAllTickets, getUserTickets]);

  useEffect(() => {
    console.log(user?.privileges, fetchFilteredTickets, userTickets);
    //IMPORTANTE!!!!!!!
    if (user?.privileges === "usuario") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      const filteredTickets = userTickets?.filter((ticket) => {
        const ticketDate = new Date(ticket.createdAt);
        return ticketDate >= oneWeekAgo;
      });

      setFilteredUserTickets(filteredTickets);
    } else {
      setFilteredUserTickets(userTickets);
    }
  }, [userTickets, user?.privileges]);


  function onDeleteTicket(id, user) {
    dispatch(destroyTicket(id, user?.email));
  }

  if (!user) {
    return (
      <div>
        Please log in to view this page!
        <button onClick={() => nav("/register")}>Register</button>
      </div>
    );
  }

  let ticketCard = (ticket) => {
    let ticketDate = new Date(ticket?.createdAt);
    return (
      <div className="ticketsContainer">
        <div onClick={() => nav(`/tickets/${ticket?.id}`)}>
          <div className="ticketId">{ticket?.id}</div>
          <span>{JSON.stringify(ticketDate.toLocaleString())}</span>
          <div>{ticket?.user}</div>
          <div className="ticketProducts">
            {ticket?.Productos &&
              ticket?.Productos.map((product, index) => (
                <div key={index} className="productTicketCard">
                  <div className="productTicketsQuantity">
                    {product["quantity"]}
                  </div>
                  <div className="productTicketsName">
                    {product["Producto"]}
                  </div>
                  <div className="productTicketsPrice">
                    {product["P. Venta"]}
                  </div>
                </div>
              ))}
            <div
              className={
                ticket?.description === "out"
                  ? "ticketTotalOut"
                  : ticket?.description === "pending"
                  ? "ticketTotalPending"
                  : "ticketTotalEntry"
              }
            >
              {Number(user?.kyu) >= 9 && (
                <span
                  className="deleteTicketButton"
                  onClick={() => {
                    onDeleteTicket(ticket?.id, user);
                  }}
                >
                  x
                </span>
              )}
              <span className="ticketTotal">{ticket["Total"]}</span>
            </div>
          </div>
          <div className="ticketCreatedAt">
            {ticket["createdAt"].split("T")[0]}
          </div>
        </div>
      </div>
    );
  };

  let currentTickets = () =>
    filteredUserTickets
      ?.filter(
        (ticket) =>{
          let currentTicketDate = new Date(ticket["createdAt"]);
          // Number(ticket["createdAt"].split("T")[0].split("-")[1]) ===
          return (Number(currentTicketDate.toLocaleString().split(",")[0].split("/")[1]) ===
          ticketDate.getMonth() + 1)
      })
      ?.filter((ticket) => {
        let currentTicketDate = new Date(ticket["createdAt"]);
        return (
          Number(currentTicketDate.toLocaleString().split("/")[0]) ===
          ticketDate.getDate()
        );
      })
      ?.filter((ticket) => {
        let currentTicketDate = new Date(ticket["createdAt"]);
        return (
          Number(currentTicketDate.toLocaleString().split(",")[0].split("/")[2]) ===
          ticketDate.getFullYear()
        )})
      ;
      

  let currentTicketsCards = () => {
    return currentTickets()
      ?.map((ticket) => {
        return <>{ticketCard(ticket)}</>;
      })
      .reverse();
  };

  function calculateDaily(type) {
    let accumulator = 0;
    currentTickets()?.forEach((ticket) => {
      if (ticket?.description === type) {
        accumulator += Number(ticket.Total);
      }
    });
    return accumulator;
  }

  function calculateMeanTicket(type) {
    let meanTicket = 0;
    let ticketCounter = 0;
    currentTickets()?.forEach((ticket) => {
      if (ticket.description === type) {
        meanTicket += Number(ticket.Total);
        ticketCounter += 1;
      }
    });
    meanTicket = Math.floor(meanTicket / ticketCounter);
    return [meanTicket, ticketCounter];
  }

  let focusSearch = () => {
    document.getElementById('inputSearch').focus()

  }
  let mostSoldToday = () => {
    let mostSoldScore = {}
    let mostSoldSorted = []
    
    currentTickets()?.forEach( t => {
      console.log("----------------------------------");
      console.log(t.id);
      if(t.description === 'out'){
        t?.Productos?.forEach(p => {
          console.log(p.Producto);
          console.log(p.id);
          mostSoldScore[p.id] = Number(mostSoldScore[p.id]) + Number(p.quantity) || Number(p.quantity) 
        })

      }
    })
    mostSoldSorted = Object.keys(mostSoldScore).map(productId => {
      console.log(productId);
      console.log('////////////////////////7');
      return [productId, mostSoldScore[productId]]
    })
    // mostSoldSorted.sort(p =>Number( p[0] ))
    console.log(mostSoldSorted);
    console.log(mostSoldScore);
    let mostSoldProducts = mostSoldSorted.map((mostSold)=>{
      return {...userProducts.find(p => {
        return p.id == mostSold[0]
      }), sales: mostSold[1]}
    })
    mostSoldProducts.sort((a, b) => b.sales - a.sales)
    setState({...state, mostSoldList: mostSoldProducts})
    return mostSoldProducts

  }
  function extractDepartments(products) {
    let departments = [];
    products?.forEach((product) => {
      if (
        !departments.find((department) => department === product?.Departamento)
      ) {
        departments.push(product?.Departamento);
      }
    });
    return departments;
  }
  let Departamentos = (productos) => {
    return (
      <>
        {extractDepartments(productos)
          ?.slice(0, 10)
          ?.map((departament) => {
            let foundProducts = productos?.filter(
              (product) => product?.Departamento === departament
            );
            let countSales = () => {
              let salesCounter = 0
              foundProducts.forEach((product) => {
                salesCounter = salesCounter + product.sales
                
              })
              return salesCounter
            }
            let countTotal = () => {
              let totalCounter = 0
              foundProducts.forEach((product) => {
                totalCounter = totalCounter + 
                (product['P. Venta'][0] === '$' ? product['P. Venta'].split('$')[1]:product['P. Venta'].split('$')[0]) * Number(product.sales)
                
              })
              return totalCounter
            }
            let departamentSales = countSales()
            let departamentTotal = countTotal()
            return (
              <div className="departamentContainer" key={departament}>
                <h3 className="departamentTitle">{departament}</h3>
                <h4>
                  {'$: '}
                  {departamentTotal}
                </h4>
                <h4>
                  
                  {'PZs: '}
                  {departamentSales}
                </h4>
                <div className="separatorLine"></div>
                
                <div className="departamentProductsContainer">
                  
                  {foundProducts?.map((foundProduct) => {
                    let productSale = (foundProduct['P. Venta'][0] === '$' ? foundProduct['P. Venta'].split('$')[1]:foundProduct['P. Venta'].split('$')[0]) * Number(foundProduct.sales)
                    
                    return(<div
                      className="departmentProductContainer"
                      key={foundProduct?.id}
                    >
                      <h3>
                        {foundProduct?.Producto ||
                          foundProduct?.Código ||
                          "Sin Nombre"}
                      </h3>
                      <h4>{`$: ${foundProduct["P. Venta"]}`}</h4>
                      <h5>{`PZs: ${foundProduct['sales']}`}</h5>
                      <h5>{'Total: $' + productSale}</h5>

                    </div>
                  )})
                  }
                </div>
              </div>
            );
          })}
      </>
    );
  };
  let toggleMostSold = () => {
    setState({...state, mostSoldTab: !state.mostSoldTab})
  }
  return (
    <>
    <div  className="ticketsLayout">
    
      <div className="ticketMiniApp">
        <div className="calendarMiniApp">
          
          {ticketDate.toLocaleString()}
          <div className="switchContainer">
            <label htmlFor="showCalendarSwitch">Mostrar Calendario</label>
            <Switch
              onChange={() => setShowCalendar(!showCalendar)}
              checked={showCalendar}
              id="showCalendarSwitch"
              />
          </div>
          {showCalendar && (<div>
            <h1>Seleccionar Fecha de Tickets</h1>
            <Calendar
            onChange={setTicketDate}
            value={ticketDate}
            defaultView={"month"}
            />
          </div>)}
          <div className="calendarTicketContainer">
            <div className="calendarTicket">
              <TicketCreator/>
              {currentTickets()?.length > 0 && (
                <div>
                  <div className="entryTotal">{calculateDaily("entry")}</div>
                  <div className="meanEntry">
                    <div>{String(calculateMeanTicket("entry")[1])}</div>
                    <div>{"entry tickets con promedio de: "}</div>
                    <div>
                      {"$" + String(calculateMeanTicket("entry")[0]) ||
                        "No hay Salida de Dinero"}
                    </div>
                  </div>
                  <div className="outTotal">{calculateDaily("out")}</div>
                  <div className="meanOut">
                    <div>{String(calculateMeanTicket("out")[1])}</div>
                    <div>{"out tickets con promedio de: "}</div>
                    <div>
                      {"$" + String(calculateMeanTicket("out")[0]) ||
                        "No hay Entrada de Dinero"}
                    </div>
                  </div>
                </div>
              )}
              <div>
                <h3>Day Balance</h3>
                <h4>{calculateDaily("out") - calculateDaily("entry")}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
          <div className="favGroup"> 
              {userProducts?.filter(product => Boolean(product.disabled) === true && product.Departamento !=='GRANEL' ).map(product => {
                return (<div className="productCard">
                  <div className="productInfo" onClick={() => {productClicked(product)}}> 
                    <div>{product.Producto}</div>
                    <div>{product['P. Venta']}</div>
                    {/* {state.granelTab  && <div className='granelTabContainer'> 
                <button  className='closeGranelTab' onClick={() => closeGranelTab()}>X</button>                
               { state.granelTab && <GranelTab product={product} weightFactor = {1000} closeCallback={() => setState({...state, granelTab: false})}></GranelTab> }
                
                </div>} */}
                    
                    
                    </div>

                </div>)
              })}
          </div>
        <div className="allTicketsContainer">
          {filteredUserTickets?.length && currentTicketsCards()}
        </div>
        <div className="mostSoldToday">
          
                <div onClick={()=> toggleMostSold()}>x</div>
                <div className="mostSoldContainer">{state.mostSoldList && state.mostSoldTab  && state.mostSoldList?.map(p => {
                  return(<div className="mostSoldCard" onClick={() => productClicked(p)}>
                    <div className="mostSoldName">
                    {p.Producto}
                      
                    </div >
                    <div className="mostSoldSales">
                    {p.sales}

                    </div>
                    <div className="mostSoldCodigo">
                    {p.Código}
                    </div>
                    <div className="mostSoldPrice">
                    {p['P. Venta'].split('$')[1]}
                    </div>
                    <div className="mostSoldTotal">
                    {(p['P. Venta'][0] === '$' ? p['P. Venta'].split('$')[1]:p['P. Venta'].split('$')[0]) * Number(p.sales)}
                    </div>


                  </div>)
                })}</div>

                _________________
                {/* <div>{JSON.stringify(userProducts)}</div> */}



        </div>
        <div>
                {state?.mostSoldList && Departamentos(state.mostSoldList) }
          
        </div>

          
    </div>
    </>
  );
}

export default Tickets;