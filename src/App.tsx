import { AppRoutes } from './routes/AppRoutes';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Sidebar } from './components/Sidebar/Sidebar';

function App() {
  return (
    <>
      <Header />
      <main className="container">
        <Sidebar />
        <AppRoutes />
      </main>
      <Footer />
    </>
  );
}

export default App;
