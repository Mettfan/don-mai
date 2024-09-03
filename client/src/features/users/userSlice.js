import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";

let cookie = new Cookies();

const createUser = createAsyncThunk(
  "user/createUser",
  async ({ user }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3001/users", {
        user: user,
      });
      return response.data.db;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data
          ? error.response.data.error
          : "Error desconocido"
      );
    }
  }
);

const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async ({ filter, value, password }, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3001/users", {
        params: { filter, value, password },
      });

      if (response.data.error) {
        return rejectWithValue(response.data.error);
      }

      cookie.set("token", response.data.token, { path: "/" });
      return response.data.user;
    } catch (error) {
      console.error(
        "Error en fetchUser:",
        error.response ? error.response.data : "Error desconocido"
      );
      return rejectWithValue(
        error.response && error.response.data
          ? error.response.data.error
          : "Error desconocido"
      );
    }
  }
);

const editUser = createAsyncThunk(
  "users/editUser",
  async ({ editingUser }, { rejectWithValue }) => {
    try {
      const token = cookie.get("token");
      const response = await axios.put("http://localhost:3001/users", { editingUser }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data
          ? error.response.data.error
          : "Error desconocido"
      );
    }
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    user: {},
    counter: 0,
    response: "",
    error: "",
  },
  reducers: {
    setCounter: (state, action) => {
      state.counter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      cookie.set("user", action.payload);
      state.loading = false;
      state.user = { ...action.payload };
      state.error = "";
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.user = {};
      state.error = action.payload || "Error desconocido";
    });

    builder.addCase(editUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editUser.fulfilled, (state, action) => {
      state.loading = false;
      state.response = action.payload;
      state.error = "";
    });
    builder.addCase(editUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Error desconocido";
      state.response = null;
    });

    builder.addCase(createUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.loading = false;
      state.response = action.payload;
      state.error = "";
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Error desconocido";
      state.response = null;
    });
  },
});

export const { setCounter } = userSlice.actions;
export const createOneUser = createUser;
export const fetchOneUser = fetchUser;
export const editOneUser = editUser;
export default userSlice.reducer;
