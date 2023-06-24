import React from 'react'
import { Dashboard } from './Components/Dashboard'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {Login} from './Components/Login'
import {Register} from './Components/Register'

import './App.css'
import { GlobalProvider } from './context/GlobalState'

const App = () => {
  return (
    <GlobalProvider >
    <Router>
    <div className='container'>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  </Router>
  </GlobalProvider>
  )
}

export default App