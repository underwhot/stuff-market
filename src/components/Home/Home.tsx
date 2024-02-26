import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import {
  setFilterByPrice,
  selectFiltredProducts,
  selectProducts,
} from '../../redux/slices/productsSlice';
import { selectCategories } from '../../redux/slices/categoriesSlice';

import { Poster } from '../Poster/Poster';
import { Products } from '../Products/Products';
import { Categories } from '../Categories/Categories';
import { Banner } from '../Banner/Banner';


export const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectProducts);
  const filtredProducts = useSelector(selectFiltredProducts);
  const categories = useSelector(selectCategories);

  useEffect(() => {
    if (!products.length) return;

    dispatch(setFilterByPrice(50));
  }, [dispatch, products.length]);

  return (
    <>
      <Poster />
      <Products products={products} amount={10} title="Trending" />
      <Categories categories={categories} amount={4} title="Worth seeing" />
      <Banner />
      <Products products={filtredProducts} amount={5} title="Lestt than 50$" />
    </>
  );
};
