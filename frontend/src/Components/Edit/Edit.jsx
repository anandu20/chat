

// import React, { useEffect, useState } from "react";
// import "../Edit/Edit.scss";
// import axios from "axios";

// const Edit = ({ setUser, setProfile }) => {
//   const value = localStorage.getItem("Auth");
//   const [details, setDetails] = useState({
//     profile: "",
//     username: "",
//     email: "",
//   });

//   useEffect(() => {
//     getProfile();
//     getData();
//   }, []);

//   const getProfile = async () => {
//     const res = await axios.get("http://localhost:3000/api/profile", {
//       headers: { Authorization: `Bearer ${value}` },
//     });
//     if (res.status === 201) {
//       setUser(res.data.data.username);
//       setProfile(res.data.data.profile);
//     } else {
//       alert("Failed to fetch profile data");
//     }
//   };

//   const getData = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/api/getuser", {
//         headers: { Authorization: `Bearer ${value}` },
//       });
//       if (res.status === 201) {
//         setDetails(res.data);
//       } else {
//         alert("Failed to fetch user data");
//       }
//     } catch (error) {
//       console.error("Error fetching data: ", error);
//       alert("Error fetching user data");
//     }
//   };

//   // Handle file input (avatar change)
//   const handleFile = async (e) => {
//     const profile = await convertToBase64(e.target.files[0]);
//     setDetails((prev) => ({ ...prev, profile }));
//   };

//   // Convert file to base64 string
//   function convertToBase64(file) {
//     return new Promise((resolve, reject) => {
//       const fileReader = new FileReader();
//       fileReader.readAsDataURL(file);
//       fileReader.onload = () => resolve(fileReader.result);
//       fileReader.onerror = (error) => reject(error);
//     });
//   }

//   // Handle input changes for username and email
//   const handleChange = (e) => {
//     setDetails((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   // Handle form submission (update user)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await axios.put(
//       "http://localhost:3000/api/updateuser",
//       details,
//       { headers: { Authorization: `Bearer ${value}` } }
//     );
//     if (res.status === 201) {
//       alert("Edit success");
//     } else {
//       alert("Failed to update");
//     }
//   };

//   return (
//     <div className="edit">
//       <div className="card">
//         {/* Card Image Section */}
//         {/* <div className="card__img"></div> */}

//         {/* Avatar Section */}
//         <div className="card__avatar">
//           <img
//             src={details.profile || "https://via.placeholder.com/128"}
//             alt="Avatar"
//             onClick={() => document.getElementById("profile").click()} // Trigger file input
//             className="card__avatar-img"
//           />
//           <input
//             type="file"
//             id="profile"
//             name="profile"
//             style={{ display: "none" }}
//             accept="image/*"
//             onChange={handleFile}
//           />
//         </div>

//         {/* Form Section */}
//         <form onSubmit={handleSubmit} className="card__form">
//           <div className="card__input-wrapper">
//             <input
//               type="text"
//               id="username"
//               name="username"
//               value={details.username}
//               onChange={handleChange}
//               placeholder="Enter username"
//               required
//             />
//           </div>

//           <div className="card__input-wrapper">
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={details.email}
//               onChange={handleChange}
//               placeholder="Enter email"
//               required
//             />
//           </div>

//           <div className="card__wrapper">
//             <button type="submit" className="card__btn card__btn-solid">
//               Save
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Edit;

import React, { useEffect, useState } from "react";
import "../Edit/Edit.scss";
import axios from "axios";
import { FaEdit } from 'react-icons/fa'; // Importing edit icon from react-icons    
import { useNavigate } from "react-router-dom";




const Edit = ({ setUser, setProfile }) => {
  const value = localStorage.getItem("Auth");
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    profile: "",
    username: "",
    email: "",
  });

  const [editable, setEditable] = useState({
    username: false,
    email: false,
  });

  useEffect(() => {
    getProfile();
    getData();
  }, []);

  const getProfile = async () => {
    const res = await axios.get("http://localhost:3000/api/profile", {
      headers: { Authorization: `Bearer ${value}` },
    });
    if (res.status === 201) {
      setUser(res.data.data.username);
      setProfile(res.data.data.profile);
    } else {
      alert("Failed to fetch profile data");
    }
  };

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/getuser", {
        headers: { Authorization: `Bearer ${value}` },
      });
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
  const handleLogout=()=>{
    localStorage.removeItem('Auth')
    navigate('/login')
  }

  // Handle file input (avatar change)
  const handleFile = async (e) => {
    const profile = await convertToBase64(e.target.files[0]);
    setDetails((prev) => ({ ...prev, profile }));
  };

  // Convert file to base64 string
  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  }

  // Handle input changes for username and email
  const handleChange = (e) => {
    setDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission (update user)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.put(
      "http://localhost:3000/api/updateuser",
      details,
      { headers: { Authorization: `Bearer ${value}` } }
    );
    if (res.status === 201) {
      alert("Edit success");
    } else {
      alert("Failed to update");
    }
  };

  // Toggle editability for fields
  const toggleEditable = (field) => {
    setEditable((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="edit">
      <div className="card">
        {/* Avatar Section */}
        <div className="card__avatar">
          <img
            src={details.profile || "https://via.placeholder.com/128"}
            alt="Avatar"
            onClick={() => document.getElementById("profile").click()} // Trigger file input
            className="card__avatar-img"
          />
          <input
            type="file"
            id="profile"
            name="profile"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleFile}
          />
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="card__form">
          <div className="card__input-wrapper">
            <input
              type="text"
              id="username"
              name="username"
              value={details.username}
              onChange={handleChange}
              placeholder="Enter username"
              readOnly={!editable.username}
            />
            <FaEdit
              className="card__edit-icon"
              onClick={() => toggleEditable("username")}
            />
          </div>

          <div className="card__input-wrapper">
            <input
              type="email"
              id="email"
              name="email"
              value={details.email}
              onChange={handleChange}
              placeholder="Enter email"
              readOnly={!editable.email}
            />
            <FaEdit
              className="card__edit-icon"
              onClick={() => toggleEditable("email")}
            />
          </div>

          <div className="card__wrapper">
            <button type="submit" className="card__btn card__btn-solid">
              Save
            </button>
          </div>
          
        </form>

        <div className="cardg">
        <button type="submit" className="cardsss" onClick={handleLogout}>Logout</button>
        </div>

      </div>
    </div>
  );
};

export default Edit;
