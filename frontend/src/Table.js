export default function Table({ data, edit, remove }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {data.map((v) => (
          <tr key={v.id}>
            <td>{v.name}</td>
            <td>{v.email}</td>
            <td>{v.phone}</td>
            <td>{v.address}</td>
            <td>
              <button className="action-btn edit" onClick={() => edit(v)}>
                Edit
              </button>
              <button className="action-btn delete" onClick={() => remove(v.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}