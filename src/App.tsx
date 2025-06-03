import './App.css'
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Shop from './pages/Shop';
import Contact from './pages/Contact';

function App() {


  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>

  )
}

export default App
