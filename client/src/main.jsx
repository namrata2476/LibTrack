import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Student from './pages/Student'
import Hostel from './pages/Hostel'
import Librarian from './pages/Librarian'
import Login from './pages/Login'
import './styles.css'

function App(){
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Student</Link> | <Link to="/hostel">Hostel</Link> | <Link to="/librarian">Librarian</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<Student/>} />
        <Route path="/hostel" element={<Hostel/>} />
        <Route path="/librarian" element={<Librarian/>} />
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(<App />)
