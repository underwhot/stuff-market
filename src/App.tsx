import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './redux/store';
import { getCategories } from './redux/slices/categoriesSlice';
import { getProducts } from './redux/slices/productsSlice';

import { AppRoutes } from './routes/AppRoutes';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Sidebar } from './components/Sidebar/Sidebar';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCategories('https://api.escuelajs.co/api/v1/categories?limit=5'));
    dispatch(getProducts('https://api.escuelajs.co/api/v1/products'))
  }, [dispatch]);

  return (
    <>
      <Header />
      <main className="wrapper">
        <Sidebar />
        <AppRoutes />
      </main>
      <Footer />
    </>
  );
}

export default App;
