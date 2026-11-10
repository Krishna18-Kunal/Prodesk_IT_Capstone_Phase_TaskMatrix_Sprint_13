import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthPage({ mode = "login" }) {
  const { user, login, register } = useAuth();
  const [name,setName] = useState("");
  const [email,setEmail] = useState("demo@taskmatrix.local");
  const [password,setPassword] = useState("TaskMatrix123!");
  const [error,setError] = useState("");
  const [busy,setBusy] = useState(false);
  const navigate = useNavigate();
  if (user) return <Navigate to="/" replace />;
  async function submit(e) {
    e.preventDefault(); setBusy(true); setError("");
    try { mode === "login" ? await login(email,password) : await register(name,email,password); navigate("/"); }
    catch(err) { setError(err.response?.data?.message || "Something went wrong. Check that the API server is running."); }
    finally { setBusy(false); }
  }
  return <div className="auth-page"><div className="auth-brand"><span className="brand-mark">T</span> TaskMatrix</div><form className="auth-card" onSubmit={submit}>
    <span className="eyebrow">YOUR TEAM WORKSPACE</span><h1>{mode === "login" ? "Welcome back" : "Create your account"}</h1><p className="muted">Plan clearly. Work together. Deliver better.</p>
    {mode === "register" && <label>Your name<input value={name} onChange={e=>setName(e.target.value)} placeholder="Alex Morgan" required/></label>}
    <label>Email address<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></label>
    <label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required minLength="8"/></label>
    {error && <p className="form-error">{error}</p>}
    <button className="btn-primary full" disabled={busy}>{busy ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}</button>
    {mode === "login" && <div className="demo-hint">Demo account is pre-filled. Password: <b>TaskMatrix123!</b></div>}
    <p className="auth-switch">{mode === "login" ? "New to TaskMatrix?" : "Already have an account?"} <a href={mode === "login" ? "/register" : "/login"}>{mode === "login" ? "Create account" : "Sign in"}</a></p>
  </form><p className="auth-foot">A focused workspace for teams that get things done.</p></div>;
}
