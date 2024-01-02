import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import Home from './components/home/Home.jsx';
import Buy from './components/BuyCar/BuyCar.jsx';
import SellWithUs from './components/sell/sellWithUs/SellWithUs.jsx';
import SellYourCar from './components/sell/sellYourCar/SellYourCar.jsx';
import Maintenance from './components/maintenance/Maintenance.jsx';
import ContactUs from './components/contact-us/ContactUs.jsx';
import Login from './components/login/Login.jsx';
import Register from './components/register/Register.jsx';
import { AuthProvider } from './contexts/authContext.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import Path from '../paths.js';
import Logout from './components/logout/Logout.jsx';
import { NotFound } from './components/not-found/NotFound.jsx';
import CarDetails from './components/car-details/CarDetails.jsx';
import CarEdit from './components/car-edit/CarEdit.jsx';

function App() {
  const [news, setNews] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/data/news`)
    .then((res) => res.json())
    .then(result => {
      console.log(result);
      setNews(result)
    }, [])
  })
  return (
    <ErrorBoundary>
    <AuthProvider>
      <div>
        <Header />
        <Routes>
          <Route path={Path.Buy} element={<Buy />} />
          <Route path={Path.Home} element={<Home />} />
          <Route path={Path.SellWithUs} element={<SellWithUs />} />
          <Route path={Path.SellCar} element={<SellYourCar />} />
          <Route path={Path.Maintenance} element={<Maintenance />} />
          <Route path={Path.Contacts} element={<ContactUs />} />
          <Route path={Path.Login} element={<Login />} />
          <Route path={Path.Register} element={<Register />} />
          <Route path="/BuyCar/:carId" element={<CarDetails />} />
          <Route path={Path.CarEdit} element={<CarEdit/>} />
          <Route path={Path.Logout} element={<Logout/>} />
          <Route path='/*' element={<NotFound/>} />
        </Routes>
        <Footer/>
      </div>
      </AuthProvider>
      </ErrorBoundary>
  );
}

export default App;