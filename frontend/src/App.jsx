import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Signup } from './pages/signup'
import { Route, Routes } from 'react-router-dom'
import { Login } from './pages/login'
import {  Home } from './pages/Home'

function App() {


  return (
    <>
    
    <Routes>
      <Route index element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/home" element={<Home/> }></Route>
    </Routes>
     

    </>
  )
}

export default App
