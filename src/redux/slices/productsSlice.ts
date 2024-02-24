import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios from 'axios';

export const getProducts = createAsyncThunk(
  'categories/getProducts',
  async (url: string, thunkAPI) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

interface CategoryItem {
  id: number;
  name: string;
  image: string;
}

interface ProductItem {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: CategoryItem;
}

interface productsState {
  list: ProductItem[];
  filtred: ProductItem[];
  related: ProductItem[];
  isLoading: boolean;
}

const initialState: productsState = {
  list: [],
  filtred: [],
  related: [],
  isLoading: false,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.list = action.payload;
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

// export const {  } = productsSlice.actions;

export const selectProducts = (state: RootState) => state.products.list;
export const selectFiltredProducts = (state: RootState) =>
  state.products.filtred;
export const selectRelatedProducts = (state: RootState) =>
  state.products.related;
export const selectIsLoading = (state: RootState) => state.products.isLoading;

export default productsSlice.reducer;
