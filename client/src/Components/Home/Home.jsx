import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Home.css";
import {
  fetchAllProducts,
  getMyProducts,
} from "../../features/products/productSlicetest";
import Cookies from "universal-cookie";
import BOXES from "../../Assets/boxes.png";
import BARCODE from "../../Assets/barcode.png";
import CATALOGO from "../../Assets/catalogo.png";
import GRAPH from "../../Assets/graph.png";
import USER from "../../Assets/user.png";
import LOGODONMAY from "../../Assets/LOGODONMAY.png";
import RECIBO from "../../Assets/RECIBO.png";
import { useNavigate } from "react-router-dom";

let tools = [
  {
    img: BOXES,
    goto: "/update/price",
  },
  {
    img: CATALOGO,
    goto: "/catalog",
  },
  {
    img: USER,
    goto: "/profile",
  },
  {
    img: RECIBO,
    goto: "/tickets",
  },
  {
    img: LOGODONMAY,
    goto: "/tutorial",
  },
  {
    img: BARCODE,
    goto: "/search",
  },
  {
    img: GRAPH,
    goto: "/stats",
  },
];

export default function Home() {
  let dispatch = useDispatch();
  let nav = useNavigate();
  let products = useSelector((state) => state.products.products);
  let cookie = new Cookies();
  let user = cookie.get("user");
  let userProducts = useSelector((status) => status?.products?.userProducts);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (user?.id) {
      getUserProducts();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let getUserProducts = () => {
    dispatch(getMyProducts({ userId: user.id }));
  };

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

  let Departamentos = () => {
    return (
      <>
        {extractDepartments(userProducts)
          ?.slice(0, 10)
          ?.map((departament) => {
            let foundProducts = userProducts?.filter(
              (product) => product?.Departamento === departament
            );

            return (
              <div className="departamentContainer" key={departament}>
                <h3 className="departamentTitle">{departament}</h3>
                <div className="separatorLine"></div>
                <div className="listContainerDepartaments">
                  {foundProducts?.map((foundProduct) => (
                    <div
                      className="filteredProductContainer"
                      key={foundProduct?.id}
                    >
                      <h3>
                        {foundProduct?.Producto ||
                          foundProduct?.Código ||
                          "Sin Nombre"}
                      </h3>
                      <h4>{`${foundProduct["P. Venta"]}`}</h4>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
      </>
    );
  };

  return (
    <div className="homePage">
      {/* Herramientas */}
      <div className="homeCarrousel">
        <div className="homeToolsWrapper">
          {tools.map((tool, index) => (
            <div className="homeToolContainer" key={index}>
              <img
                alt=""
                onClick={() => {
                  nav(tool.goto);
                }}
                className="homeBannerImg"
                src={tool.img}
              ></img>
            </div>
          ))}
        </div>
      </div>

      {/* Productos */}
      <div className="promosHome">
        {products
          .slice(0, 10)
          ?.reverse()
          .map((recentProduct) => (
            <div className="promoContainer" key={recentProduct?.id}>
              <h3>
                {recentProduct?.Producto ||
                  recentProduct?.Código ||
                  "Sin Nombre"}
              </h3>
              <h4>{`${recentProduct["P. Venta"]}`}</h4>
              {/* <img alt="" className="promoImg" src={recentProduct?.image || LOGODONMAY}></img> */}
            </div>
          ))}
      </div>

      {/* Departamentos */}
      <div className="homeDepartmentsWrapper">
        {userProducts && Departamentos()}
      </div>
    </div>
  );
}