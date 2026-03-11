
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import About from "./pages/About"


function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* Landing Page */}
        <Route path="/" element={<Home />} />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Couple Sync Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />

      </Routes>

    </BrowserRouter>
  )

}

export default App

