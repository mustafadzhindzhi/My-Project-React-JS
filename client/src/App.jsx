import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import Home from './components/Home/Home';
import Buy from './components/BuyCar/BuyCar.jsx';
import SellWithUs from './components/Sell/SellWithUs.jsx';


function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/buyCar" element={<Buy />} />
          <Route path="/" element={<Home />} />
          <Route path='/sellYourCar' element={<SellWithUs />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;