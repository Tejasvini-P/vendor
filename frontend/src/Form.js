import { useState, useEffect } from "react";

export default function Form({ add, edit, update }) {
  const [v, setV] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    if (edit) setV(edit);
  }, [edit]);

  const handle = (e) =>
    setV({ ...v, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    edit ? update(v) : add(v);
    setV({ name: "", email: "", phone: "", address: "" });
  };

  return (
    <form onSubmit={submit}>
      <input name="name" placeholder="Vendor Name" onChange={handle} value={v.name} />
      <input name="email" placeholder="Email" onChange={handle} value={v.email} />
      <input name="phone" placeholder="Phone" onChange={handle} value={v.phone} />
      <input name="address" placeholder="Address" onChange={handle} value={v.address} />

      <button type="submit">
        {edit ? "Update Vendor" : "Add Vendor"}
      </button>
    </form>
  );
}