import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Activity, CheckSquare, LayoutDashboard, LogOut, Plus, Users } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const links = [
    ["/", "Overview", LayoutDashboard],
    ["/board", "My board", CheckSquare],
    ["/projects", "Projects", Users],
    ["/activity", "Activity", Activity]
  ];
  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><span className="brand-mark">T</span><span>TaskMatrix</span></div>
      <div className="workspace-label">WORKSPACE</div>
      <nav className="nav-list">
        {links.map(([to, label, Icon]) => <NavLink key={to} to={to} end={to === "/"} className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}><Icon size={18}/>{label}</NavLink>)}
      </nav>
      <div className="sidebar-bottom">
        <div className="avatar">{user?.name?.slice(0,1)?.toUpperCase() || "U"}</div>
        <div className="user-meta"><strong>{user?.name}</strong><span>{user?.email}</span></div>
        <button className="icon-button" title="Log out" onClick={() => { logout(); navigate("/login"); }}><LogOut size={17}/></button>
      </div>
    </aside>
    <main className="main-area">
      <header className="topbar"><div className="crumb">Workspace <span>/</span> <b>Overview</b></div><div className="top-actions"><span className="online-dot"/> All systems operational <div className="avatar small">{user?.name?.slice(0,1)?.toUpperCase()}</div></div></header>
      <div className="page-content"><Outlet /></div>
    </main>
  </div>;
}
