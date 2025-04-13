import React, { useEffect, useState } from "react";

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
        console.log(data);
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
          <p>Loading profile...</p>
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
        <h2 className="text-color">{user.username}</h2>
        <p className="text-color">{user.email}</p>
        <p className="text-color">********</p>
        <button className="add-journey" onClick={handleLogout}>Logout</button>
        
      </div>
    </div>
  );
}

export default Profile;
