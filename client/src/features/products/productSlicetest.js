import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const productSlicetest = createSlice({
  name: "productos",
  initialState: {
    loading: false,
    products: [],
    selectedProduct: {},
    productSelectedCounter: 0,
    ticketProducts: [],
    totalTicket: 0,
    shoppingCart: [],
    counterId: 0,
    response: "",
    error: "",
    totalInvest: null,
    modalShown: false,
    payment: null,
    tickets: [],
    ticket: {},
    userProducts: [],
    userTickets: [],
  },
  reducers: {
    setPayment: (state, action) => {
      state.payment = action.payload;
      console.log(state.payment);
    },
    showModal: (state, action) => {
      state.modalShown = true;
    },
    hideModal: (state, action) => {
      state.modalShown = false;
    },
    setCounter: (state, action) => {
      state.counterId = action.payload;
    },
    counterIncrement: (state) => {
      state.counterId += 1;
    },
    counterDecrement: (state) => {
      if (state.counterId > 0) {
        state.counterId -= 1;
      }
    },
    nextProduct: (state) => {
      if (state.productSelectedCounter < state.ticketProducts.length - 1) {
        state.productSelectedCounter += 1;
      }
      console.log("Next!");
    },
    previousProduct: (state) => {
      if (state.productSelectedCounter > 0) {
        state.productSelectedCounter -= 1;
      }
      console.log("Previous!");
    },
    addProductToGlobalTicket: (state, action) => {
      if (
        state.ticketProducts.find(
          (listedProduct) => action.payload.id === listedProduct.id
        )
      ) {
        console.log("Ya existe");
        state.ticketProducts = state.ticketProducts.map((producto) => {
          if (action.payload.id === producto.id) {
            return { ...producto, quantity: producto.quantity + 1 };
          } else {
            return producto;
          }
        });
      } else {
        state.ticketProducts = [
          ...state.ticketProducts,
          {
            ...action.payload,
            quantity: action.payload.adder > 0 ? action.payload.adder : 1,
          },
        ];
        console.log("Product added: " + JSON.stringify(action.payload));
      }
    },
    removeProductFromGlobalTicket: (state, action) => {
      let foundProduct = state.ticketProducts.find(
        (listedProduct) => action.payload.id === listedProduct.id
      );
      if (!(foundProduct?.quantity === 0)) {
        if (foundProduct) {
          console.log("Ya existe");
          state.ticketProducts = state.ticketProducts.map((producto) => {
            if (action.payload.id === producto.id && producto.quantity > 0) {
              return { ...producto, quantity: producto.quantity - 1 };
            } else {
              return producto;
            }
          });
        } else {
          console.log(
            "Product currently inexistent: " + JSON.stringify(action.payload)
          );
        }
      } else {
        state.ticketProducts = state.ticketProducts.filter(
          (product) => product["id"] !== action.payload["id"]
        );
      }
    },

    //Next function sets 0 on product quantity at global ticket
    deleteProductFromGlobalTicket: (state, action) => {
      let foundProduct = state.ticketProducts.find(
        (listedProduct) => action.payload.id === listedProduct.id
      );

      if (foundProduct) {
        console.log("Ya existe");
        state.ticketProducts = state.ticketProducts.filter((producto) => {
          if (!(action.payload.id === producto.id)) {
            return producto;
          }
        });
      } else {
        console.log(
          "Product currently inexistent: " + JSON.stringify(action.payload)
        );
      }
    },

    setProductQuantity: (state, action) => {
      console.log(action);
      if (
        state.ticketProducts.find(
          (listedProduct) => action.payload.id === listedProduct.id
        )
      ) {
        console.log("Ya existe");
        state.ticketProducts = state.ticketProducts.map((producto) => {
          if (action.payload.id === producto.id && producto.quantity > 0) {
            return { ...producto, quantity: action.payload.quantity };
          } else {
            return producto;
          }
        });
      } else {
        console.log(
          "Product currently inexistent: " + JSON.stringify(action.payload)
        );
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.error = "";
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.error = action.error.message;
    });

    builder.addCase(fetchProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedProduct = { ...action.payload, selected: false };
      state.error = "";
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.loading = false;
      state.selectedProduct = {};
      state.error = action.error.message;
    });

    builder.addCase(editProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.response = action.payload;
      state.error = "";
    });
    builder.addCase(editProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.response = null;
    });

    builder.addCase(createProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.response = action.payload;
      state.error = "";
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.response = null;
    });

    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.response = action.payload;
      state.error = "";
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.response = null;
    });

    builder.addCase(addProductStock.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addProductStock.fulfilled, (state, action) => {
      state.loading = false;
      state.response = action.payload;
      state.error = "";
    });
    builder.addCase(addProductStock.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.response = null;
    });

    builder.addCase(fetchTotalInvest.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTotalInvest.fulfilled, (state, action) => {
      state.loading = false;
      state.totalInvest = action.payload;
      state.error = "";
    });
    builder.addCase(fetchTotalInvest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.response = null;
    });

    builder.addCase(decreaseStock.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(decreaseStock.fulfilled, (state, action) => {
      state.loading = false;
      state.response = action.payload;
      state.error = "";
    });
    builder.addCase(decreaseStock.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.response = null;
    });
    /// Here starts Ticket case
    builder.addCase(makeTicket.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(makeTicket.fulfilled, (state, action) => {
      state.loading = false;
      state.response = action.payload;
      state.error = "";
    });
    builder.addCase(makeTicket.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.response = null;
    });

    builder.addCase(getTickets.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTickets.fulfilled, (state, action) => {
      state.loading = false;
      state.tickets = action.payload;
      state.error = "";
    });
    builder.addCase(getTickets.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.response = null;
    });

    builder.addCase(getTicket.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTicket.fulfilled, (state, action) => {
      state.loading = false;
      state.ticket = action.payload.response;
      state.error = "";
    });
    builder.addCase(getTicket.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.response = null;
    });

    builder.addCase(deleteTicket.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTicket.fulfilled, (state, action) => {
      state.loading = false;
      state.ticket = action.payload;
      state.error = "";
    });
    builder.addCase(deleteTicket.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.response = null;
    });

    builder.addCase(associateProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(associateProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.response = action.payload;
      state.error = "";
    });
    builder.addCase(associateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.response = null;
    });

    builder.addCase(getUserProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.userProducts = action.payload;
      state.error = "";
    });
    builder.addCase(getUserProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.response = null;
    });

    builder.addCase(deleteUserProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUserProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.response = action.payload;
      state.error = "";
    });
    builder.addCase(deleteUserProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.response = null;
    });
    builder.addCase(filterTickets.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(filterTickets.fulfilled, (state, action) => {
      state.loading = false;
      state.userTickets = action.payload;
      state.error = "";
    });
    builder.addCase(filterTickets.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.response = null;
    });
  },
});

const fetchProducts = createAsyncThunk("products/fetchProducts", () => {
  return axios
    .get("http://localhost:3001/products")
    .then((response) => response.data.db);
});
const fetchProduct = createAsyncThunk(
  "products/fetchProduct",
  ({ filter, value, userId }) => {
    console.log(value);
    console.log(userId);
    console.log(filter);
    return axios
      .get(
        `http://localhost:3001/products/?filter=${filter}&value=${value}&userId=${
          userId || null
        }`
      )
      .then((response) => response.data);
  }
);
const editProduct = createAsyncThunk(
  "products/editProduct",
  ({ id, findBy, infoUpdated }) => {
    // console.log(value);
    return axios
      .put(`http://localhost:3001/products/update`, {
        id,
        findBy,
        infoUpdated,
      })
      .then((response) => response.data);
  }
);
const createProduct = createAsyncThunk(
  "products/createProduct",
  ({ products, userId }) => {
    // console.log(value);
    return axios
      .post(`http://localhost:3001/products/upload`, {
        productos: [...products],
        userId: userId || null,
      })
      .then((response) => response.data);
  }
);
const deleteProduct = createAsyncThunk("products/deleteProduct", (id) => {
  // console.log(value);
  return axios
    .post(`http://localhost:3001/products/delete`, {
      id,
    })
    .then((response) => response.data);
});
const addProductStock = createAsyncThunk(
  "products/addProductStock",
  ({ productBarcode, quantity, id }) => {
    console.log(productBarcode);
    return axios
      .put(`http://localhost:3001/add/product/stock`, {
        productBarcode,
        quantity: Number(quantity),
        id: id,
      })
      .then((response) => response.data);
  }
);
const fetchTotalInvest = createAsyncThunk(
  "products/fetchTotalInvest",
  (investType) => {
    return axios
      .get(`http://localhost:3001/product/invest/?investType=${investType}`)
      .then((response) => response.data);
  }
);
const decreaseStock = createAsyncThunk(
  "products/sellProducts",
  ({ products }) => {
    return axios
      .post(`http://localhost:3001/product/sell`, {
        productos: [
          ...products.map((product) => {
            return { ...product, quantity: product.quantity };
          }),
        ],
      })
      .then((response) => response.data);
  }
);
const makeTicket = createAsyncThunk(
  "products/ticketProducts",
  ({ products, total, user, client, description, createdAt }) => {
    console.log(products, total, user, client, description, createdAt);
    return axios
      .post(`http://localhost:3001/Tickets`, {
        products,
        total,
        user,
        client,
        description,
        createdAt,
      })
      .then((response) => response.data);
  }
);
const getTickets = createAsyncThunk("products/getTickets", () => {
  return axios
    .get(`http://localhost:3001/Tickets`)
    .then((response) => response.data);
});
const getTicket = createAsyncThunk("products/getTicket", (id) => {
  return axios
    .get(`http://localhost:3001/Tickets/?id=${id}`)
    .then((response) => response.data);
});
const deleteTicket = createAsyncThunk("products/deleteTicket", (id, user) => {
  return axios
    .post(`http://localhost:3001/Ticket/delete`, {
      id,
      user,
    })
    .then((response) => response.data);
});
const associateProduct = createAsyncThunk(
  "products/associateProduct",
  ({ userId, productId }) => {
    return axios
      .post(`http://localhost:3001/product/add/user`, {
        userId,
        productId,
      })
      .then((response) => response.data);
  }
);
const getUserProducts = createAsyncThunk(
  "products/getUserProducts",
  ({ userId }) => {
    return axios
      .get(`http://localhost:3001/product/get/user/?userId=${userId}`)
      .then((response) => response.data);
  }
);
const deleteUserProduct = createAsyncThunk(
  "products/deleteUserProduct",
  ({ userId, productId }) => {
    return axios
      .delete(
        `http://localhost:3001/product/delete/user/?userId=${userId}&productId=${productId}`
      )
      .then((response) => response.data);
  }
);
const filterTickets = createAsyncThunk(
  "products/filterTickets",
  ({ filter, value }) => {
    return axios
      .get(
        `http://localhost:3001/Tickets/search/?filter=${filter}&value=${value}`
      )
      .then((response) => response.data);
  }
);
const editTicket = createAsyncThunk("Ticket/edit", (editingTicket) => {
  return axios
    .put(`http://localhost:3001/Ticket/edit`, {
      editingTicket,
    })
    .then((response) => response.data);
});
export const {
  setPayment,
  showModal,
  hideModal,
  nextProduct,
  previousProduct,
  addProductToGlobalTicket,
  removeProductFromGlobalTicket,
  counterDecrement,
  counterIncrement,
  setCounter,
  addProductToShoppingCart,
  setProductQuantity,
  deleteProductFromGlobalTicket,
} = productSlicetest.actions;
export const productSliceReducer = productSlicetest.reducer;
export const fetchAllProducts = fetchProducts;
export const fetchOneProduct = fetchProduct;
export const editOneProduct = editProduct;
export const postProduct = createProduct;
export const eraseProduct = deleteProduct;
export const addProductToStock = addProductStock;
export const getTotalInvested = fetchTotalInvest;
export const sellProducts = decreaseStock;
export const spawnModal = showModal;
export const killModal = hideModal;
export const postTicket = makeTicket;
export const fetchTickets = getTickets;
export const getTicketById = getTicket;
export const destroyTicket = deleteTicket;
export const editOneTicket = editTicket;
export const matchProduct = associateProduct;
export const getMyProducts = getUserProducts;
export const removeProduct = deleteUserProduct;
export const fetchFilteredTickets = filterTickets;