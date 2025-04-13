import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [message, setMessage] = useState([]);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
        const url = "http://localhost:5000/api/auth/register";
      const res =await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
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
    <h2>Register</h2>

<form onSubmit={handleRegister}>
  <input
    type="email"
    placeholder="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
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