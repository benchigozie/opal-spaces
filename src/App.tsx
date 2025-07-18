import './App.css'
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import NoHeaderLayout from './layouts/NoHeaderLayout';
import SignForms from './pages/SignForms';
import Cart from './pages/Cart';
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useAPIInterceptor } from './hooks/useAPIInterceptor';
import ProductsDash from './pages/admin/ProductsDash';
import Orders from './pages/admin/Orders';
import Inventory from './pages/admin/Inventory';
import Users from './pages/admin/Users';


const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID; 

function App() {

  useAPIInterceptor();
  
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route element={<NoHeaderLayout />}>
          <Route path="signin" element={<SignForms />} />
        </Route>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<ProductsDash />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/inventory" element={<Inventory />} />
          <Route path="/admin/users" element={<Users />} />
        </Route>
      </Routes>
    </GoogleOAuthProvider>

  )
}

export default App
