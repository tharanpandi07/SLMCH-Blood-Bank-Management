import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, UserPlus, PackageOpen, Refrigerator, LogOut } from "lucide-react";
import "./Sidebar.css";

const items = [
  { label: "Overview", path: "/dashboard", icon: Home },
  { label: "Register Donor", path: "/register-donor", icon: UserPlus },
  { label: "Blood Inventory", path: "/blood-inventory", icon: PackageOpen },
  { label: "Cold Storage", path: "/cold-storage", icon: Refrigerator }
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  function logout() {
    localStorage.removeItem("bb_token");
    localStorage.removeItem("bb_user");
    navigate("/", { replace: true });
  }

  return (
    <aside className="sidebar">
      <div className="brand">
        <img src="/hospital-logo.png" alt="Sri Lalithambigai Medical College and Hospital" />
      </div>

      <nav className="sidebar-nav">
        {items.map(({ label, path, icon: Icon }) => (
          <button
            key={path}
            className={`sidebar-link ${location.pathname === path || (path === "/dashboard" && location.pathname === "/overview") ? "active" : ""}`}
            onClick={() => navigate(path)}
          >
            <Icon size={21} strokeWidth={2} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="secure-note">
          <span className="secure-dot" />
          System secure
        </div>
        <button className="sidebar-link logout" onClick={logout}>
          <LogOut size={21} />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );
}
