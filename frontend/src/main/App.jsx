import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

import Logo from '../componentes/template/Logo'
import Routes from './Routes'
import Nav from '../componentes/template/Nav'
import Footer from '../componentes/template/Footer'

export default props =>
    <BrowserRouter>
        <div className="app">
            <ToastContainer/>
            <Logo />
            <Nav />
            <Routes/>
            <Footer />
        </div>
    </BrowserRouter>
