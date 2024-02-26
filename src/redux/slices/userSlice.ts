import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios from 'axios';

interface CreateUser {
  name: string;
  password: string;
  email: string;
  avatar: string;
}

export const createUser = createAsyncThunk(
  'categories/createUser',
  async (payload: { url: string; user: CreateUser }, thunkAPI) => {
    try {
      const res = await axios.post(payload.url, payload.user);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

interface LoginUser {
  password: string;
  email: string;
}

export const loginUser = createAsyncThunk(
  'categories/loginUser',
  async (
    payload: { loginURL: string; profileURL: string; user: LoginUser },
    thunkAPI
  ) => {
    try {
      const res = await axios.post(payload.loginURL, payload.user);
      const login = await axios.get(payload.profileURL, {
        headers: {
          Authorization: `Bearer ${res.data.access_token}`,
        },
      });
      return login.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  'categories/updateUser',
  async (payload: { url: string; user: CreateUser }, thunkAPI) => {
    try {
      const res = await axios.put(payload.url, payload.user);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

interface Cart {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CurrentUser extends CreateUser {
  id: number;
  role: string;
}

interface User {
  currentUser: CurrentUser | null;
  cart: Cart[];
  isLoading: boolean;
  formType: string;
  showForm: boolean;
}

const initialState: User = {
  currentUser: null,
  cart: [],
  isLoading: false,
  formType: 'signup',
  showForm: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAddtoCart: (state, action) => {
      let newCart = [...state.cart];
      const found = state.cart.find((item) => item.id === action.payload.id);

      if (found) {
        newCart = newCart.map((item) => {
          return item.id === action.payload.id
            ? {
                ...item,
                quantity: action.payload.quantity || item.quantity + 1,
              }
            : item;
        });
      } else {
        newCart.push({ ...action.payload, quantity: 1 });
      }

      state.cart = newCart;
    },

    setToggleShowForm: (state, action) => {
      state.showForm = action.payload;
    },

    setToggleFormType: (state, action) => {
      state.formType = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
  },
});

export const { setAddtoCart, setToggleShowForm, setToggleFormType } =
  userSlice.actions;

export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectCart = (state: RootState) => state.user.cart;
export const selectIsLoading = (state: RootState) => state.user.isLoading;
export const selectFormType = (state: RootState) => state.user.formType;
export const selectShowForm = (state: RootState) => state.user.showForm;

export default userSlice.reducer;
