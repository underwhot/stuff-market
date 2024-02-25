import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios from 'axios';

// export const getProducts = createAsyncThunk(
//   'categories/getProducts',
//   async (url: string, thunkAPI) => {
//     try {
//       const res = await axios.get(url);
//       return res.data;
//     } catch (error) {
//       console.log(error);
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

interface Cart {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface User {
  currentUser: any;
  cart: Cart[];
  isLoading: boolean;
}

const initialState: User = {
  currentUser: [],
  cart: [],
  isLoading: false,
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
  },
  // extraReducers(builder) {
  //   builder.addCase(getProducts.pending, (state) => {
  //     state.isLoading = true;
  //   });
  //   builder.addCase(getProducts.fulfilled, (state, action) => {
  //     state.isLoading = false;
  //   });
  //   builder.addCase(getProducts.rejected, (state) => {
  //     state.isLoading = false;
  //   });
  // },
});

export const { setAddtoCart } = userSlice.actions;

export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectCart = (state: RootState) => state.user.cart;
export const selectIsLoading = (state: RootState) => state.user.isLoading;

export default userSlice.reducer;
