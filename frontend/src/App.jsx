import React from 'react'
import LoginSignUp from './pages/LoginSignUp'
import Home from './pages/Home'
import LoginAdmin from './pages/LoginAdmin'
import Admin from './pages/Admin'
import { BrowserRouter  , Routes ,Route } from 'react-router-dom'
import List from './pages/List'


const App = () => {
  return (
    <>
     <BrowserRouter>
      <Routes>
      <Route path="/home" element={<Home/>}></Route>  
      <Route path="/" element={<LoginSignUp/>}></Route>  
      <Route path="/adminlogin" element={<LoginAdmin/>}></Route>  
      <Route path="/admin" element={<Admin/>}></Route>  
      <Route path="/list" element={<List/>}></Route>
      </Routes>  
    </BrowserRouter>
    </>
  )
}

export default App
