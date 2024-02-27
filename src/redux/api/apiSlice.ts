import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import buildUrl from '../../utils/buildUrl';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/' }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: ({ id }) => `/products/${id}`,
      providesTags: ['Product'],
    }),
    getProducts: builder.query({
      query: ({ category }) => `/products/category/${category}`,
      // query: (params) => buildUrl('/products', params),
      // query: (params) => console.log(params),
      providesTags: ['Products'],
    }),
  }),
});

export const { useGetProductQuery, useGetProductsQuery } = apiSlice;
