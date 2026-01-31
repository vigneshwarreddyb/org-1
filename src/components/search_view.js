const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

/*
 * Dummy users data (you can replace this with DB later)
 */
const users = [
  {
    dealer_name: "vignesh reddy",
    gst_number: "688269556433239",
    mobile: "9701244518",
    city: "hyderabad",
    state: "telagana",
    status: "ACTIVE"
  },
  {
    dealer_name: "suresh kumar",
    gst_number: "988269556433111",
    mobile: "9876543210",
    city: "bangalore",
    state: "karnataka",
    status: "ACTIVE"
  },
  {
    dealer_name: "rajesh",
    gst_number: "788269556433999",
    mobile: "9123456789",
    city: "chennai",
    state: "tamil nadu",
    status: "INACTIVE"
  }
];

/*
 * SEARCH USERS WITH PAGINATION
 * Query Params:
 * ?search=vignesh
 * ?page=1
 * ?limit=5
 */
app.get("/api/users", (req, res) => {
  const search = (req.query.search || "").toLowerCase();
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  // Filter users based on search
  const filteredUsers = users.filter(user =>
    user.dealer_name.toLowerCase().includes(search) ||
    user.mobile.includes(search) ||
    user.city.toLowerCase().includes(search) ||
    user.state.toLowerCase().includes(search)
  );

  const totalResults = filteredUsers.length;
  const totalPages = Math.ceil(totalResults / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  res.json({
    success: true,
    currentPage: page,
    totalPages: totalPages,
    totalResults: totalResults,
    users: paginatedUsers
  });
});

/*
 * START SERVER
 */
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
