import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Droplet, LockKeyhole, UserRound } from "lucide-react";
import { api } from "./api";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [username,setUsername] = useState("staff");
  const [password,setPassword] = useState("staff123");
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);

  async function submit(e){
    e.preventDefault();
    setError("");
    setLoading(true);
    try{
      const data = await api("/auth/login", {
        method:"POST",
        body:JSON.stringify({username,password})
      });
      localStorage.setItem("bb_token",data.token);
      localStorage.setItem("bb_user",data.username);
      navigate("/dashboard",{replace:true});
    }catch(err){
      setError(err.message);
    }finally{setLoading(false)}
  }

  return (
    <div className="login-page">
      <section className="login-left">
        <img src="/hospital.jpg" alt="Sri Lalithambigai Medical College and Hospital" className="login-hospital" />
        <div className="login-overlay">
          <div className="blood-logo"><img src="/blood-drop.jpeg" alt="Blood"/> </div>
          <h1>Blood Bank<br/>Management System</h1>
          <p>Manage donors, blood inventory and cold storage in one place.</p>
        </div>
      </section>

      <section className="login-right">
        <form className="login-card" onSubmit={submit}>
          <img src="/college-logo.png" alt="College Logo" className="login-logo"/>
          <p className="eyebrow">STAFF PORTAL</p>
          <h2>Welcome back</h2>
          <p className="login-desc">Sign in to continue to the blood bank dashboard.</p>

          <label>
            Register ID
            <div className="login-input">
              <UserRound size={19}/>
              <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Enter Register ID" autoComplete="username"/>
            </div>
          </label>

          <label>
            Password
            <div className="login-input">
              <LockKeyhole size={19}/>
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter Password" autoComplete="current-password"/>
            </div>
          </label>

          {error && <div className="login-error">{error}</div>}

          <button className="login-btn" disabled={loading}>
            {loading ? "Signing in..." : "LOGIN  →"}
          </button>

          <small className="demo-note">Demo: staff / staff123</small>
        </form>
      </section>
    </div>
  );
}
