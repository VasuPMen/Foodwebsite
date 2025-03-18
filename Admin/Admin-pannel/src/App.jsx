import React from 'react'
import { Navbar } from './components/Navbar/Navbar'
import { Sidebar } from './components/sidebar/sidebar'
import { Routes,Route} from 'react-router-dom'
import { Add } from './pages/Add/Add'
import { List } from './pages/List/List'
import { Order } from './pages/Orders/Order'
import { ToastContainer } from 'react-toastify';

export const App = () => {
  const url=  "http://localhost:3000"
  return (
    <div>
        <ToastContainer/>
        <Navbar/>
        <hr/>
        <div className="app-content">
            <Sidebar/>
            <Routes>
                <Route path="/add" element={<Add  url = {url}/>}/>
                <Route path="/list" element={<List url = {url}/>}/>
                <Route path="/orders" element={<Order url = {url}/>}/>
            </Routes>
        </div>
    </div>
  )
}
