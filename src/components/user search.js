import React, { useEffect, useState } from "react";
import axios from "axios";

function UserSearch() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/users", {
      params: {
        search: search,
        page: page,
        limit: 5
      }
    });

    setUsers(res.data.users);
    setTotalPages(res.data.totalPages);
  };

  useEffect(() => {
    fetchUsers();
  }, [search, page]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dealer Search</h2>

      {/* SEARCH BAR */}
      <input
        type="text"
        placeholder="Search by name, city, state, mobile"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        style={{ padding: "10px", width: "300px" }}
      />

      {/* RESULTS */}
      <ul>
        {users.map((user, index) => (
          <li key={index} style={{ marginTop: "10px" }}>
            <strong>{user.dealer_name}</strong> <br />
            GST: {user.gst_number} <br />
            Mobile: {user.mobile} <br />
            City: {user.city}, {user.state} <br />
            Status: {user.status}
          </li>
        ))}
      </ul>

      {/* PAGINATION */}
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Prev
      </button>

      <span style={{ margin: "0 10px" }}>
        Page {page} of {totalPages}
      </span>

      <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
        Next
      </button>
    </div>
  );
}

export default UserSearch;
