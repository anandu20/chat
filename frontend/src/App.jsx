import { useState } from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Home from './Components/Home/Home';
import Contacts from './Components/Contacts/Contacts';


function App() {
  const [user,setUser]=useState("")
  const [profile,setProfile]=useState("")
  return (
 <BrowserRouter>
 <Routes>
 

  <Route path='/login' Component={Login}/>
  <Route path='/signup' Component={Signup}></Route>
  <Route path='/' element={<Home setUser={setUser} setProfile={setProfile}/>}></Route>
  <Route path='/contacts' element={<Contacts setUser={setUser} setProfile={setProfile}/>}></Route>

  

 </Routes>
 </BrowserRouter>  )
}

export default App
