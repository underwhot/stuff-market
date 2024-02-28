import { Route, Routes } from 'react-router-dom';

import { Home } from '../components/Home/Home';
import { SingleProduct } from '../components/Products/SingleProduct';
import { Profile } from '../components/Profile/Profile';
import { SingleCategory } from '../components/Categories/SingleCategory';
import { Cart } from '../components/Cart/Cart';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/products/:id" element={<SingleProduct />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/categories/:category" element={<SingleCategory />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};
