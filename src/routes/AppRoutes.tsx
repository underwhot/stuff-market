import { Route, Routes } from 'react-router-dom';

import { Home } from '../components/Home/Home';
import { SingleProduct } from '../components/Products/SingleProduct';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/products/:id" element={<SingleProduct />} />
    </Routes>
  );
};
