// VendorPro Secure © Kishore

import { useState } from "react";
import api from "./api";

export default function Login({ setToken }) {
  const [u, setU] = useState("");
  const [p, setP] = useState("");

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/login", {
        username: u,
        password: p
      });

      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
    } catch {
      alert("Login Failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>VendorPro Login © </h2>

      <form onSubmit={login}>
        <input placeholder="Username" onChange={(e) => setU(e.target.value)} />
        <br /><br />
        <input type="password" placeholder="Password" onChange={(e) => setP(e.target.value)} />
        <br /><br />
        <button>Login</button>
      </form>

      <p>admin / admin123</p>
    </div>
  );
}