import React from 'react';

function HomePage({ user, onLogout }) {
  return (
    <div className="home-container">
      <div className="navbar">
        <h1>Registration Portal</h1>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>

      <div className="home-content">
        <div className="welcome-banner">
          <h2>Welcome, {user.firstName} {user.lastName}! 👋</h2>
          <p>Your account has been successfully created and verified</p>
        </div>

        <div className="info-cards">
          <div className="info-card">
            <h3>🔐 Account Information</h3>
            <div className="info-item">
              <span className="info-label">Username</span>
              <span className="info-value">{user.username}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email</span>
              <span className="info-value">{user.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Company Name</span>
              <span className="info-value">{user.companyName}</span>
            </div>
          </div>

          <div className="info-card">
            <h3>👤 Personal Details</h3>
            <div className="info-item">
              <span className="info-label">Full Name</span>
              <span className="info-value">{user.firstName} {user.lastName}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Mobile</span>
              <span className="info-value">{user.mobile}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Residence Pincode</span>
              <span className="info-value">{user.residencePincode}</span>
            </div>
          </div>

          <div className="info-card">
            <h3>🏢 Organization Details</h3>
            <div className="info-item">
              <span className="info-label">GSTN</span>
              <span className="info-value">{user.gstn}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Company Pincode</span>
              <span className="info-value">{user.companyPincode}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Company Address</span>
              <span className="info-value">{user.companyAddress}</span>
            </div>
          </div>

          <div className="info-card">
            <h3>📍 Location Details</h3>
            <div className="info-item">
              <span className="info-label">City</span>
              <span className="info-value">{user.city}</span>
            </div>
            <div className="info-item">
              <span className="info-label">State</span>
              <span className="info-value">{user.state}</span>
            </div>
          </div>

          <div className="info-card">
            <h3>💳 Billing Information</h3>
            <div className="info-item">
              <span className="info-label">Card Holder</span>
              <span className="info-value">{user.cardHolderName}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Card Number</span>
              <span className="info-value">**** **** **** {user.cardNumber.slice(-4)}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Expiry Date</span>
              <span className="info-value">{user.expiryDate}</span>
            </div>
          </div>

          <div className="info-card">
            <h3>📮 Billing Address</h3>
            <div className="info-item">
              <span className="info-label">Address</span>
              <span className="info-value">{user.billingAddress}</span>
            </div>
            <div className="info-item">
              <span className="info-label">City</span>
              <span className="info-value">{user.billingCity}</span>
            </div>
            <div className="info-item">
              <span className="info-label">State</span>
              <span className="info-value">{user.billingState}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Pincode</span>
              <span className="info-value">{user.billingPincode}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
