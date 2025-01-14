import { useState } from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Nav from './Components/Nav/Nav';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Home from './Components/Home/Home';
import Contacts from './Components/Contacts/Contacts';
import Chat from './Components/Chat/Chat';
import Edit from './Components/Edit/Edit';
import Email from './Components/Email/Email';
import Forget from './Components/Forget/Forget';
import Profile from './Components/Profile/Profile';


function App() {
  const [user,setUser]=useState("")
  const [profile,setProfile]=useState("")
  return (
 <BrowserRouter>
 {user&& <Nav user={user} profile={profile}></Nav>}
 <Routes>
 

  <Route path='/login' Component={Login}/>
  <Route path='/signup' Component={Signup}/>
  <Route path='/' element={<Home setUser={setUser} setProfile={setProfile}/>}/>
  <Route path='/contacts' element={<Contacts setUser={setUser} setProfile={setProfile}/>}/>
  <Route path='/chat/:id' element={<Chat setUser={setUser} setProfile={setProfile}/>}/>
  <Route path='/edit' element={<Edit setUser={setUser} setProfile={setProfile}/>}></Route>
  <Route path='/forget' Component={Forget}></Route>
  <Route path='/email' Component={Email}></Route>
  <Route path='/profile/:id' element={<Profile setUser={setUser} setProfile={setProfile}/>}/>


 </Routes>
 </BrowserRouter>  )
}

export default App
