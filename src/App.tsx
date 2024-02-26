import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './redux/store';
import { getCategories } from './redux/slices/categoriesSlice';
import { getProducts } from './redux/slices/productsSlice';

import { AppRoutes } from './routes/AppRoutes';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Sidebar } from './components/Sidebar/Sidebar';
import { UserForm } from './components/User/UserForm';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCategories('https://fakestoreapi.com/products/categories'));
    dispatch(getProducts('https://fakestoreapi.com/products/'));
  }, [dispatch]);

  return (
    <>
      <Header />
      <UserForm />
      <main className="wrapper">
        <Sidebar />
        <AppRoutes />
      </main>
      <Footer />
    </>
  );
}

export default App;
