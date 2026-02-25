// Yo protejo rutas para que solo el trabajador pueda entrar al panel.
import React from "react";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!token) return <Navigate to="/login" />;
  if (user?.role !== "trabajador") return <Navigate to="/" />;

  return children;
}