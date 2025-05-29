import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateQuantityInCart,
  removeProductFromCart,
  clearCart,
  getShoppingCart,
} from "../../features/products/productSlicetest";
import styles from "./Carrito.module.css";
import Modal from "react-modal";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import Cookies from "universal-cookie";

const Carrito = () => {
  let cookie = new Cookies();
  const publicKey = process.env.REACT_APP_PUBLIC_KEY;
  const shoppingCart = useSelector((state) => state.products.shoppingCart);

  const dispatch = useDispatch();
  let user = cookie.get("user");

  const [modalVisible, setModalVisible] = useState(false);
  const [preferenceId, setPreferenceId] = useState(null);

  initMercadoPago(publicKey, {
    locale: "es-MX",
  });

  const getCart = useCallback(() => {
    dispatch(getShoppingCart({ userId: user.id }));
    console.log("Fetching shopping cart for user:", user.id);
    console.log("Shopping cart fetched:", shoppingCart);
  }, [dispatch, user?.id, shoppingCart]);

  const handleIncrement = (product) => {
    dispatch(
      updateQuantityInCart({
        userId: user?.id,
        id: product.id,
        quantity: product.quantity + 1,
      })
    );
  };

  const handleDecrement = (product) => {
    if (product.quantity > 1) {
      dispatch(
        updateQuantityInCart({
          userId: user?.id,
          id: product.id,
          quantity: product.quantity - 1,
        })
      );
    } else {
      dispatch(
        removeProductFromCart({ userId: user?.id, productId: product.id })
      );
    }
  };

  const handleRemove = (product) => {
    dispatch(
      removeProductFromCart({ userId: user?.id, productId: product.id })
    );
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const getNumericPrice = (product) => {
    const priceStr = product["P. Venta"];
    if (typeof priceStr === "string" && priceStr.startsWith("$")) {
      const parsedPrice = parseFloat(priceStr.substring(1));
      return parsedPrice;
    }
    const parsedPrice = parseFloat(priceStr);
    return parsedPrice;
  };

  const totalCarrito =
    shoppingCart?.length === 0
      ? 0
      : shoppingCart?.reduce((total, item) => {
          const price = getNumericPrice(item);
          return isNaN(price) ? total : total + price * item.quantity;
        }, 0);

  // Function to create Mercado Pago preference
  const createPreference = async () => {
    try {
      const items = shoppingCart?.map((item) => ({
        title: item.Producto,
        unit_price: getNumericPrice(item),
        quantity: item.quantity,
      }));

      const response = await axios.post(
        "http://localhost:3001/pago/cart_preference",
        {
          items: items,
          userId: user.id,
        }
      );
      const { id } = response.data;
      return id;
    } catch (error) {
      console.error("Error creating Mercado Pago preference:", error);
      return null;
    }
  };

  const handleBuy = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
      setModalVisible(true); // Open the modal to show the Wallet component
    }
  };

  useEffect(() => {
    if (user) {
      getCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, user.id]);

  return (
    <div className={styles.carritoContainer}>
      <h2 className={styles.carritoTitulo}>Carrito</h2>
      {shoppingCart && shoppingCart.length === 0 ? (
        <p className={styles.carritoVacio}>No hay productos en el carrito.</p>
      ) : (
        <ul className={styles.carritoLista}>
          {shoppingCart?.map((producto) => {
            const price = getNumericPrice(producto);
            const subtotal = isNaN(price) ? 0 : price * producto.quantity;

            return (
              <li key={producto.id} className={styles.carritoItem}>
                <div className={styles.productoInfo}>
                  <span className={styles.productoNombre}>
                    {producto.Producto}
                  </span>
                  <span className={styles.productoPrecio}>
                    Precio: ${isNaN(price) ? "N/A" : price.toFixed(2)}
                  </span>
                </div>
                <div className={styles.cantidadControles}>
                  <button
                    className={styles.cantidadBoton}
                    onClick={() => handleDecrement(producto)}
                  >
                    -
                  </button>
                  <span className={styles.cantidadNumero}>
                    {producto.quantity}
                  </span>
                  <button
                    className={styles.cantidadBoton}
                    onClick={() => handleIncrement(producto)}
                  >
                    +
                  </button>
                  <button
                    className={styles.cantidadBoton}
                    onClick={() => handleRemove(producto)}
                  >
                    Eliminar
                  </button>
                </div>
                <span className={styles.productoSubtotal}>
                  Subtotal: ${isNaN(subtotal) ? "N/A" : subtotal.toFixed(2)}
                </span>
              </li>
            );
          })}
        </ul>
      )}
      {shoppingCart && shoppingCart.length > 0 && (
        <div className={styles.carritoTotal}>
          <span className={styles.totalTexto}>Total:</span>
          <span className={styles.totalPrecio}>${totalCarrito.toFixed(2)}</span>
          <button className={styles.comprarBoton} onClick={handleBuy}>
            {" "}
            Comprar con Mercado Pago
          </button>
          <button
            className={styles.vaciarCarritoBoton}
            onClick={handleClearCart}
          >
            Vaciar Carrito
          </button>
        </div>
      )}

      {/* Mercado Pago Modal */}
      {modalVisible && (
        <Modal
          isOpen={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          className={styles.mercadoPagoModalContent}
          overlayClassName={styles.mercadoPagoModalOverlay}
        >
          <button
            onClick={() => setModalVisible(false)}
            className={styles.modalCloseButton}
          >
            X
          </button>
          <h2>Completa tu compra</h2>
          {preferenceId && (
            <Wallet initialization={{ preferenceId: preferenceId }} />
          )}
        </Modal>
      )}
    </div>
  );
};

export default Carrito;
