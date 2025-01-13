import React, { useState } from 'react'
import '../Signup/Signup.scss'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        username: "",
        password: "",
        cpassword: "",
        profile: "" // Added profile field to handle the image URL or base64 string
    });

    const handleChange = (e) => {
        console.log(e.target.value);
        setData((pre) => ({
            ...pre, [e.target.name]: e.target.value
        }));
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setData(prev => ({
                    ...prev,
                    profile: reader.result // Save the base64 image to the state
                }));
            };
            reader.readAsDataURL(file); // Convert the image to base64
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post("http://localhost:3000/api/signup", data, {
            headers: { "Content-Type": "application/json" }
        });
        console.log(res);
        if (res.status === 201) {
            alert("Success");
            navigate("/login");
        } else {
            alert("Failed");
        }
    }

    return (
        <div className='signup'>
            <div className="card3">
                <div className="card4">
                    <form className="form" onSubmit={handleSubmit}>
                        <p id="heading">Signup</p>
                        <div className="field">
                            <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg" className="input-icon">
                                <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
                            </svg>
                            <input type="text" className="input-field" placeholder="Username" name='username' id='username' autocomplete="off" onChange={handleChange} />
                        </div>
                        <div className="field">
                            <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg" className="input-icon">
                                <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
                            </svg>
                            <input type="email" className="input-field" placeholder="Email" name='email' id='email' autocomplete="off" onChange={handleChange} />
                        </div>
                        <div className="field">
                            <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg" className="input-icon">
                                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
                            </svg>
                            <input type="password" className="input-field" placeholder="Password" name='password' id='password' onChange={handleChange} />
                        </div>
                        <div className="field">
                            <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg" className="input-icon">
                                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
                            </svg>
                            <input type="password" className="input-field" placeholder="CPassword" name='cpassword' id='cpassword' onChange={handleChange} />
                        </div>
                        
                        <div className="field profile-image">
                            <input type="file" className="input-field" id="profile" name="profile" accept="image/*" onChange={handleImageChange} />
                        </div>
                        <div className="display">
                        {data.profile && <img src={data.profile} alt="Profile" className="profile-img" />}
                        </div>
                        
                        <button className="button3">Submit</button>

                        <p className='hii'>
                            Already have an account? <a href="/login">Log In</a>
                         </p>
                    </form>
                   
                </div>
            </div>
        </div>
    );
}

export default Signup;