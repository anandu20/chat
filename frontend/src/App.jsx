import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Home from './Components/Home/Home';

function App() {
  // const [user,setUser]=useState("")
  // const [profile,setProfile]=useState("")
  return (
 <BrowserRouter>
 <Routes>
 {/* <Route path='/' element={<Home setUser={setUser} setProfile={setProfile}/>}></Route> */}
 <Route path='/' Component={Home}/>
  <Route path='/login' Component={Login}/>
  <Route path='/signup' Component={Signup}></Route>
  

 </Routes>
 </BrowserRouter>  )
}

export default App
