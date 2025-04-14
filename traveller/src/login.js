import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const url = "https://nakama-set-sail.onrender.com/api/auth/login";
      const res =await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        setError(data.message || "invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong");
    }
  };

  return(
    <div className="login-container" style={{
      backgroundImage: "url('/images/loginbg.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'bottom',
      backgroundRepeat: 'no-repeat',
    }}>
   <div className="login-con">
   <div className="log-header">
   <h2>Login</h2> 
   <a href="/"><FaHome className="back-home" /></a>
   </div>
    {error && <p className="error">{error}</p>}

    <form onSubmit={handleLogin}>
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
      <button className="add-journey" type="submit">Login</button>
    </form>
   </div>
  </div>
  )
}

export default Login;