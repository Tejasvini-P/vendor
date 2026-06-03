// VendorPro Secure © Kishore

import { useState, useEffect } from "react";
import api from "./api";
import Login from "./Login";
import Form from "./Form";
import Table from "./Table";
import "./styles.css";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(null);

  const load = async () => {
    const res = await api.get("/vendors");
    setData(res.data);
  };

  useEffect(() => {
    if (token) load();
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  if (!token) return <Login setToken={setToken} />;

  const add = async (v) => {
    await api.post("/vendors", v);
    load();
  };

  const update = async (v) => {
    await api.put(`/vendors/${v.id}`, v);
    setEdit(null);
    load();
  };

  const remove = async (id) => {
    await api.delete(`/vendors/${id}`);
    load();
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2>VendorPro © </h2>
        <p>Dashboard</p>
        <p onClick={logout}>Logout</p>
      </div>

      <div className="main">
        <h2>Secure Vendor Dashboard</h2>

        <Form add={add} edit={edit} update={update} />
        <Table data={data} edit={setEdit} remove={remove} />
      </div>
    </div>
  );
}