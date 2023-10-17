import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetails from './components/ProductDetails/ProductDetails';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <div>
      <Header></Header>
      <Router>
        <Routes>
          <Route path="/shop" element={<Shop />} />
          <Route path='/review' element={<Review />} />
          <Route path='/inventory' element={<Inventory />} />
          <Route path='/' element={<Shop />} />
          <Route path='/product/:productKey' element={<ProductDetails />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}



export default App;
