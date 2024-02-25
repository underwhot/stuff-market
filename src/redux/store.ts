import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';

import categoriesReducer from './slices/categoriesSlice';
import productsReducer from './slices/productsSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getMiddleware) => getMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
