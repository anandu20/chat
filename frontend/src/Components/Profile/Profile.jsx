import React, { useEffect, useState } from "react";
import "../Profile/Profile.scss";
import axios from "axios";
import { useNavigate,useParams} from "react-router-dom";
import { Link } from "react-router-dom";

const Profile = ({setUser,setProfile}) => {
    const {id} = useParams();
  const value = localStorage.getItem("Auth");
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    profile: "",
    username: "",
    email: "",
  });
  useEffect(() => {
    getProfile();
    getData();
  }, []);

  const getProfile = async () => {

    const res = await axios.get("http://localhost:3000/api/profile", {
        headers: { "Authorization": `Bearer ${value}` }
    })
    if (res.status === 201) {
        setUser(res.data.data.username)
        setProfile(res.data.data.profile)
        }  
     else {
        alert("failed")
    }
}
  const getData = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/getuserp/${id}`, {headers: { Authorization: `Bearer ${value}` },});
      if (res.status === 201) {
        setDetails(res.data);
      } else {
        alert("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      alert("Error fetching user data");
    }
  };


  return (
    <div className="edit">
      <div className="card">
      <h2 className="pro">Profile</h2>

        {/* Avatar Section */}
        <div className="card__avatar">
          <img
            src={details.profile || "https://via.placeholder.com/128"}
            alt="Avatar"
            className="card__avatar-img"
          />
          <input
            type="file"
            id="profile"
            name="profile"
            style={{ display: "none" }}
            accept="image/*"
          />
        </div>

        {/* Form Section */}
        <form className="card__form">
          <div className="card__input-wrapper">
            <input
              type="text"
              id="username"
              name="username"
              value={details.username}
              placeholder="Enter username"
              disabled="true"
              required
            />
          </div>

          <div className="card__input-wrapper">
            <input
              type="email"
              id="email"
              name="email"
              value={details.email}
              placeholder="Enter email"
              disabled="true"

              required
            />
          </div>
          <div className="card__wrapper">
          <Link to={`/chat/${details._id}`}><button type="submit" className="card__btn card__btn-solid">Message</button></Link>

          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile