import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import Home from './components/home/Home.jsx';
import Buy from './components/BuyCar/BuyCar.jsx';
import SellWithUs from './components/Sell/SellWithUs.jsx';
import SellYourCar from './components/sell/SellYourCar.jsx';
import Maintenance from './components/maintenance/Maintenance.jsx';
import ContactUs from './components/contact-us/ContactUs.jsx';
import Login from './components/login/Login.jsx';
import Register from './components/register/Register.jsx';

function App() {
  return (
      <div>
        <Header />
        <Routes>
          <Route path="/buyCar" element={<Buy />} />
          <Route path="/" element={<Home />} />
          <Route path='/sellWithUs' element={<SellWithUs />} />
          <Route path='/sell' element={<SellYourCar />} />
          <Route path='/maintenance' element={<Maintenance />} />
          <Route path='/contacts' element={<ContactUs />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
        <Footer/>
      </div>
  );
}

export default App;