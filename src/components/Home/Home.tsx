import { useSelector } from 'react-redux';
import { Poster } from '../Poster/Poster';
import { Products } from '../Products/Products';
import { selectProducts } from '../../redux/slices/productsSlice';

export const Home = () => {
  const products = useSelector(selectProducts);

  console.log(products);

  return (
    <>
      <Poster />
      <Products products={products} amount={5} title="Trending" />
    </>
  );
};
