import {useEffect, useState} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import Homepage from "./pages/Homepage";
import Product from "./pages/Product.jsx";
import Pricing from "./pages/Pricing.jsx";
import Login from "./pages/Login.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import CountryList from "./components/CountryList.jsx";
import CityList from "./components/CityList.jsx";
import PageNotFound from "./pages/PageNotFound";
import City from "./components/City.jsx";
import Form from "./components/Form.jsx";
import {CityProvider} from "./contexts/CityProvider.jsx";

function App() {
  return (
    <CityProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='product' element={<Product/>}/>
          <Route path='pricing' element={<Pricing/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='app' element={<AppLayout/>}>
            <Route index element={<Navigate to='cities' replace/>}/>
            <Route path='cities' element={<CityList/>}/>
            <Route path='cities/:id' element={<City/>}/>
            <Route path='countries' element={<CountryList/>}/>
            <Route path='form' element={<Form/>}/>
          </Route>
          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
      </BrowserRouter>
    </CityProvider>
  )
}

export default App
