import React, { useState } from "react";
import axios from "axios";

const api = "https://kyc.infyss.com/api";

function SearchPage({ onBack }) {
  const [query, setQuery] = useState("");
  const [dealer, setDealer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setDealer(null);

    try {
      const token = localStorage.getItem("access");

      const res = await axios.get(
        `${api}/dealers/search/?q=${encodeURIComponent(query)}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (res.data && res.data.length > 0) {
        setDealer(res.data[0]);
      } else {
        setError("No dealer found");
      }
    } catch {
      setError("Failed to fetch dealer details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <div className="navbar">
        <h1>Dealer Search</h1>
        <button className="logout-btn" onClick={onBack}>
          ← Back
        </button>
      </div>

      <div className="home-content">
        <div className="info-card">
          <h3>🔍 Search Dealer</h3>

          <input
            type="text"
            className="form-input"
            placeholder="Enter dealer name / GST / mobile"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ marginBottom: "16px" }}
          />

          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>

        {loading && <p>Searching...</p>}
        {error && <p style={{ color: "#ff6b6b" }}>{error}</p>}

        {dealer && (
          <div className="info-card" style={{ marginTop: "30px" }}>
            <h3>📄 Dealer Details</h3>

            <div className="info-item">
              <span className="info-label">Dealer Name</span>
              <span className="info-value">{dealer.dealer_name}</span>
            </div>
            <div className="info-item">
              <span className="info-label">GST Number</span>
              <span className="info-value">{dealer.gst_number}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Mobile</span>
              <span className="info-value">{dealer.mobile}</span>
            </div>
            <div className="info-item">
              <span className="info-label">City</span>
              <span className="info-value">{dealer.city}</span>
            </div>
            <div className="info-item">
              <span className="info-label">State</span>
              <span className="info-value">{dealer.state}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Status</span>
              <span className="info-value">{dealer.status}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
