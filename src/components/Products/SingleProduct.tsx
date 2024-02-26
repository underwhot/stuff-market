import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductQuery } from '../../redux/api/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import {
  selectProducts,
  selectRelatedProducts,
  setRelatedProducts,
} from '../../redux/slices/productsSlice';

import { Product } from './Product';
import { Products } from './Products';

export const SingleProduct = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isError, isFetching, isLoading, isSuccess } =
    useGetProductQuery({ id });
  const relatedProducts = useSelector(selectRelatedProducts);
  const allProducts = useSelector(selectProducts);

  useEffect(() => {
    if (!isFetching && !isLoading && !isSuccess) {
      navigate('/');
    }
  }, [isFetching, isLoading, isSuccess]);

  useEffect(() => {
    if (!data || !allProducts) return;

    dispatch(setRelatedProducts(data.category));
  }, [data]);

  return !data ? (
    <section className="preloader">Loading...</section>
  ) : (
    <>
      <Product {...data} />
      <Products
        products={relatedProducts}
        title="Related products"
        amount={5}
      />
    </>
  );
};
