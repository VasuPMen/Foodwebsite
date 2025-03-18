import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Cart from './pages/Cart/Cart.jsx'
import Placeorder from './pages/Placeorder/Placeorder.jsx'
import Footer from './components/Footer/Footer.jsx'
import AppDownLoad from './components/AppDownLoad/AppDownLoad.jsx'
import Login from './components/Login/Login.jsx'
import { MyOrders } from './pages/Myorders/Myorders.jsx'
import {Order} from '../../Admin/Admin-pannel/src/pages/Orders/Order.jsx'

function App() {

  const [showLogin , setShowLogin] = useState(false)

  return (
    <>
    {showLogin?<Login setShowLogin={setShowLogin}/>:<></>}
    <div className="app">
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path="/" element={<Home/>} /> 
        <Route path='/home' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<Placeorder/>}/>
        <Route path='/myorders' element={<MyOrders/>}/>
        <Route path="/orders" element={<Order />} />
      </Routes>
    </div>
    <AppDownLoad/>
    <Footer/>
    </>
  )
}

export default App
