import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios from 'axios';

export const getCategories = createAsyncThunk(
  'categories/getCategories',
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

interface categoriesState {
  list: string[];
  isLoading: boolean;
}

const initialState: categoriesState = {
  list: [],
  isLoading: false,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.list = action.payload;
    });
    builder.addCase(getCategories.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

// export const {  } = categoriesSlice.actions;

export const selectCategories = (state: RootState) => state.categories.list;
export const selectIsLoading = (state: RootState) => state.categories.isLoading;

export default categoriesSlice.reducer;
