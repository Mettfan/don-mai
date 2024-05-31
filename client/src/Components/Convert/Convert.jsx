import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";
import Barcode from "react-barcode";
import "./Convert.css";
import { PDFExport } from "@progress/kendo-react-pdf";
import Cookies from "universal-cookie";
import { postProduct } from "../../features/products/productSlicetest";

export function downloadExcel(data, titulo = "Respaldo") {
  const fileName = titulo;

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, titulo);

  XLSX.writeFile(wb, fileName + ".xlsx");
}

export default function Convert() {
  const pdf = useRef();
  const dispatch = useDispatch();
  const cookie = new Cookies();
  const user = useSelector((state) => state.user) || cookie.get("user");
  const [state, setState] = useState({
    productos: null,
    li: 0,
    ls: 9,
  });

  const productos = state.productos;
  const li = state.li;
  const ls = state.ls;

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };
      fileReader.onerror = (error) => reject(error);
    });

    promise.then((d) => {
      setState({ ...state, productos: d });
    });
  };

  const inputOnChange = (e) => {
    const selectedFile = e.target.files[0];
    readExcel(selectedFile);
  };

  const saveAsPDF = () => {
    if (pdf.current) {
      pdf.current.save();
    }
  };

  const saveProducts = () => {
    if (productos) {
      saveAsPDF();
    }
  };

  const uploadProducts = () => {
    if (productos) {
      dispatch(postProduct({ products: productos, userId: user?.id }));
    }
  };

  const nextPage = () => {
    ls < productos?.length &&
      setState({ ...state, li: state.li + 9, ls: state.ls + 9 });
  };

  const previousPage = () => {
    li > 0 && setState({ ...state, li: state.li - 9, ls: state.ls - 9 });
  };

  return (
    <div className="convertContainer">
      <h2>Convertir y Subir Productos</h2>
      <input
        onChange={(e) => inputOnChange(e)}
        type="file"
        id="hoja"
        accept=".xls, .xlsx"
        className="convertInput"
      />
      {productos && (
        <div className="convertButtonWrapper">
          <button onClick={() => saveProducts()} className="convertButton">
            Guardar Productos y Etiquetar
          </button>
          <button onClick={() => uploadProducts()} className="convertButton">
            Subir Productos
          </button>
        </div>
      )}
      <PDFExport
        fileName="barcodes.pdf"
        paperSize="A4"
        margin={"0cm"}
        ref={pdf}
      >
        {productos && (
          <div className="productsWrapper">
            {productos.slice(li, ls).map((producto) => (
              <div className="productContainer" key={producto.Código}>
                <div>
                  <Barcode value={producto.Código} width={3} height={100} />
                </div>
                {producto.Producto + " > "}
                {producto["P. Venta"]}
              </div>
            ))}
          </div>
        )}
      </PDFExport>
      {productos && (
        <div className="convertPagination">
          <button onClick={() => previousPage()} className="convertNavButton">
            Anterior
          </button>
          <button onClick={() => nextPage()} className="convertNavButton">
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}