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

function App() {


  return (
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
    </Routes>

  )
}

export default App
