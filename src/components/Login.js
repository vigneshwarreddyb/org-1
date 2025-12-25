import React, { useState } from 'react';

function Login({ onLogin, onNavigateToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = onLogin(email, password);
    
    if (!result.success) {
      setError(result.error);
    }
  };

  return (
    <div className="app-container">
      <div className="left-section">
        <div className="character-illustration">
          <div className="character-avatar"></div>
          <h2 style={{fontSize: '28px', marginBottom: '10px'}}>
            Welcome to Registration
          </h2>
          <p style={{color: '#8a94a6'}}>
            Create your account or login to continue
          </p>
        </div>
      </div>

      <div className="right-section">
        <div className="login-container">
          <h1 className="form-title">Welcome Back</h1>
          <p className="form-subtitle">Login to your account</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span 
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </span>
              </div>
            </div>

            {error && (
              <div className="error-message" style={{marginBottom: '16px'}}>
                {error}
              </div>
            )}

            <button type="submit" className="btn btn-primary" style={{width: '100%', justifyContent: 'center'}}>
              Login
            </button>
          </form>
          <div className="signup-link">
            Don't have an account? <a onClick={onNavigateToRegister}>Sign Up</a>
          </div>

          <div style={{marginTop: '30px', padding: '20px', background: '#1e2836', borderRadius: '12px'}}>
            <p style={{color: '#8a94a6', fontSize: '13px', marginBottom: '8px'}}>Demo Account:</p>
            <p style={{color: '#8B7FFF', fontSize: '14px'}}>Email: test@gmail.com</p>
            <p style={{color: '#8B7FFF', fontSize: '14px'}}>Password: test</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
