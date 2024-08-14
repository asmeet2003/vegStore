import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Home from './page/Home';
import About from './page/About';
import Menu from './page/Menu';
import Contact from './page/Contact';
import Login from './page/Login';
import Newproduct from './page/Newproduct';
import Signup from './page/Signup';
import {store} from './redux/index';
import {Provider} from 'react-redux';
import Cart from './page/Cart';
import OrderTracking from './page/OrderTracking';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} >
        <Route index element={<Home/>}/>
        {/* <Route path='menu' element={<Menu/>}/>  */}
     <Route path='menu/:filterby' element={<Menu/>}/> 
      <Route path='about' element={<About/>}/>
       <Route path='contact' element={<Contact/>}/>
       <Route path='login' element={<Login/>}/>
       <Route path='newproduct' element={<Newproduct/>}/>
       <Route path='signup' element={<Signup/>}/>
       <Route path='cart' element={<Cart/>}/>
       {/* <Route path="/ordertracking" element={<OrderTracking/>}/> Define the route for OrderTracking */}

      </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <RouterProvider router={router} />
</Provider>
);
 
reportWebVitals();
