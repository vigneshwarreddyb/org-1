import React, { useState } from 'react';

function StepOne({ formData, setFormData, onNext, onNavigateToLogin }) {
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className="app-container">
      <div className="left-section">
        <div className="character-illustration">
          <div className="character-avatar"></div>
          <h2 style={{fontSize: '28px', marginBottom: '10px'}}>Join Us Today</h2>
          <p style={{color: '#8a94a6'}}>Create your account in just 3 steps</p>
        </div>
      </div>

      <div className="right-section">
        <div className="progress-steps">
          <div className="step active">
            <div className="step-icon">📄</div>
            <div className="step-info">
              <h3>Account</h3>
              <p>Account Details</p>
            </div>
          </div>
          <div className="step">
            <div className="step-icon">👤</div>
            <div className="step-info">
              <h3>Personal</h3>
              <p>Enter Information</p>
            </div>
          </div>
          <div className="step">
            <div className="step-icon">📋</div>
            <div className="step-info">
              <h3>Billing</h3>
              <p>Payment Details</p>
            </div>
          </div>
        </div>

        <div className="form-container">
          <h1 className="form-title">Account Information</h1>
          <p className="form-subtitle">Enter Your Account Details</p>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                type="text"
                name="username"
                className="form-input"
                placeholder="Admin"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && <div className="error-message">{errors.username}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="Admin@gmail.com"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="form-input"
                  placeholder="admin@123"
                  value={formData.password}
                  onChange={handleChange}
                />
                <span 
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </span>
              </div>
              {errors.password && <div className="error-message">{errors.password}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <div className="input-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  className="form-input"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <span 
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                </span>
              </div>
              {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Company Name</label>
            <input
              type="text"
              name="companyName"
              className="form-input"
              placeholder="Fertilisers"
              value={formData.companyName}
              onChange={handleChange}
            />
            {errors.companyName && <div className="error-message">{errors.companyName}</div>}
          </div>

          <div className="form-navigation">
            <button className="btn btn-secondary" disabled>
              ← Previous
            </button>
            <button className="btn btn-primary" onClick={handleNext}>
              Next →
            </button>
          </div>

          <div className="signup-link">
            Already have an account? <a onClick={onNavigateToLogin}>Login</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StepOne;
