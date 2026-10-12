import React from "react";
import "./Header.css";

export default function Header({ title, subtitle }) {
  const username = localStorage.getItem("bb_user") || "staff";
  return (
    <header className="page-header">
      <div>
        <p className="eyebrow">BLOOD BANK OPERATIONS</p>
        <h1>{title}</h1>
        <p className="page-subtitle">{subtitle}</p>
      </div>
      <div className="profile">
        <div className="profile-circle">{username.charAt(0).toUpperCase()}</div>
        <div>
          <strong>{username}</strong>
          <span>Administrator</span>
        </div>
      </div>
    </header>
  );
}
