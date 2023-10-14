import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import Listing from "./pages/Listing"
import Benefits from "./pages/Benefits"
import Faqs from "./pages/Faqs"
import Contact from "./pages/Contact"

function App() {
  return (
    <BrowserRouter>
      <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/listing' element={<Listing />} />
          <Route path='/benefits' element={<Benefits />} />
          <Route path='/faqs' element={<Faqs />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/sign-up' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
