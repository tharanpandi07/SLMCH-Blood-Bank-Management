import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Overview from "./Overview";
import RegisterDonor from "./RegisterDonor";
import BloodInventory from "./BloodInventory";
import ColdStorage from "./ColdStorage";

import "./global.css";

function ProtectedRoute({ children }) {
  return localStorage.getItem("bb_token")
    ? children
    : <Navigate to="/" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute><Overview /></ProtectedRoute>
        } />
        <Route path="/overview" element={
          <ProtectedRoute><Navigate to="/dashboard" replace /></ProtectedRoute>
        } />
        <Route path="/register-donor" element={
          <ProtectedRoute><RegisterDonor /></ProtectedRoute>
        } />
        <Route path="/blood-inventory" element={
          <ProtectedRoute><BloodInventory /></ProtectedRoute>
        } />
        <Route path="/cold-storage" element={
          <ProtectedRoute><ColdStorage /></ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
