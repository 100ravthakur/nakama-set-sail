import React, { useEffect, useState } from "react";
import { FaAddressCard, FaEnvelopeOpen, FaHandHoldingHeart, FaUser, FaHome, FaPen } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
function Profile() {
  const [user, setUser] = useState(null);
  const isLoggedIn = !!localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  }

  const fetchProfile = async () => {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch("https://nakama-set-sail.onrender.com/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      if (res.ok) {
        const data = await res.json();
        console.log("PROFILE DATA:", data);
        setUser(data);
      } else {
        throw new Error("Failed to fetch profile");
      }
    } catch (error) {
      console.log("Error loading profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!user) {
    return (
      <div className="profile">
        <div className="profile-load">
          <p>Wait For it ......</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-data"  style={{
      backgroundImage: "url('/images/profilebg.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'bottom',
      backgroundRepeat: 'no-repeat',
    }}>
    
      <div className="profile-card">
        <img
          src={user.profileImage || "/images/profile.jpg"}
          alt="Profile"
          className="profile-img"
          width={70}
        />
        <h4 className="text-color"><FaAddressCard className="icon-pro" />{user.name}</h4>
        <p className="text-color"><FaUser className="icon-pro" />{user.username}</p>
        <p className="text-color"><FaEnvelopeOpen className="icon-pro" />{user.email}</p>
        {/* <h4 className="text-color"><FaPen className="icon-pro" />{user.description}</h4> */}
        <div className="log-header">
        <button className="add-journey" onClick={handleLogout}>Logout</button>
         <a href="/"><FaHome className="back-home" /></a>
         </div>
        
      </div>
    </div>
  );
}

export default Profile;
