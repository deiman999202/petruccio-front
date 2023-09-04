import './App.scss';
import {Routes, Route} from 'react-router-dom'
import Layout from './components/Layout/Layout';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import NoPage from './pages/NoPage/NoPage';
import CartPage from './pages/CartPage/CartPage';
import AboutPage from './pages/AboutPage/AboutPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<ProductsPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='*' element={<NoPage/>} />
      </Route>
    </Routes>
  );
}

export default App;
