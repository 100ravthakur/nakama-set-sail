import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [username, setUsername] = useState([]);
  const [message, setMessage] = useState([]);
  const [name, setName] = useState([]);
  const [description, setDescription] = useState([]);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
        const url = "https://nakama-set-sail.onrender.com/api/auth/register";
      const res =await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username, name, description }),
      });
 
      const data = await res.json();
      console.log(data)
      if (res.ok) {
        setMessage("Registration successful! You can now login.");
        setTimeout(() => {
            navigate("/login"); 
          }, 1500);
       
      } else {
        setMessage(data.message || "invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Something went wrong");
    }
  };

  return(
    <div className="login-container" style={{
      backgroundImage: "url('/images/registerbg.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'bottom',
      backgroundRepeat: 'no-repeat',
    }}>
    <div className="login-con">
      <div className="log-header">
         <h2>Register</h2> 
         <a href="/"><FaHome className="back-home" /></a>
         </div>
    

<form onSubmit={handleRegister}>
  <input
    type="email"
    placeholder="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
  /><br/>
   <input
    type="text"
    placeholder="Full Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    required
  /><br/>
  <input
    type="text"
    placeholder="Username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    required
  /><br/>
  <input
  type="text"
    placeholder="Your guiding words..."
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    required
  /><br/>
  <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
  /><br/>
  <button className="add-journey" type="submit">Register</button>
</form>
    </div>
  </div>
  )
}


export default Register;