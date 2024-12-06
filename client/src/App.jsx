import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Home, About, Contact, Policy, Register, Login, Dashboard, ForgotPassword, AdminDashboard, CreateCategory, CreateProduct, Orders, Profile, Products, UpdateProduct, Search, ProductDetail,Categories, CategoryProduct, Cart, AdminOrders, ReservationForm, GiveFeedback, Feedbacks} from "./pages";
import { Navbar, Footer, PrivateRoute, AdminRoute, NotFound, ScrollToTop} from "./components";
import {Toaster} from "react-hot-toast";
import "./App.css";
const App = () => {
  return (

    <BrowserRouter>
    {/* <Info/> */}
    <Toaster/>
    <Navbar/>
    {/* <ScrollToTop/> */}
      <div className='App'>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='*' element={<NotFound/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/product/:slug' element={<ProductDetail/>} />
      <Route path='/categories' element={<Categories/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/category/:slug' element={<CategoryProduct/>} />
      <Route path='/search' element={<Search/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/policy' element={<Policy/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/login' element={<Login/>} />
      {/* <Route path='/reservation' element={<ReservationForm/>} /> */}
      <Route path='/forgot-password' element={<ForgotPassword/>} />
      <Route path='/feedback' element={<GiveFeedback/>} />

      <Route path='/dashboard' element={<PrivateRoute/>}>
      <Route path='user' element={<Dashboard/>} />
      <Route path='user/orders' element={<Orders/>} />
      <Route path='user/profile' element={<Profile/>} />
      <Route path='user/feedbacks' element={<Feedbacks/>} />

      </Route>
      
      <Route path='/dashboard' element={<AdminRoute/>}>
      <Route path='admin' element={<AdminDashboard/>} />
      <Route path='admin/create-category' element={<CreateCategory/>} />
      <Route path='admin/create-product' element={<CreateProduct/>} />
      <Route path='admin/product/:slug' element={<UpdateProduct/>} />
      <Route path='admin/products' element={<Products/>} />
      {/* <Route path='admin/users' element={<Users/>} /> */}
      <Route path='admin/orders' element={<AdminOrders/>} />
      </Route>
    </Routes>
    </div>
    {/* <Footer/> */}
    </BrowserRouter>

  )
}

export default App;