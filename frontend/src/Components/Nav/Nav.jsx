import React from 'react'
import '../Nav/Nav.scss'
import { Link } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'
const Nav = ({user,profile}) => {
  const navigate = useNavigate()
    // console.log(user);
    // console.log(profile);
      const handleLogout=()=>{
        localStorage.removeItem('Auth')
        navigate('/login')
      }
    
  return (
    <div className='nav'>
      <nav>
        <div className="left">
            <div className="logo">
                <img src="/img/chat.png" alt="" />
            </div>
                <a href="/"><h2 className='mate'>Chatmate</h2></a>
        </div>
        <div className="right">
          {/* <button onClick={handleLogout}>Logout</button> */}
            <h1>{user}</h1>
            <div className="profilee">
                <Link to="/edit"><img src={profile} alt="profile image" /></Link>
            </div>
            
        </div>
      </nav>
    </div>
  )
}

export default Nav