import React, { useState, useEffect } from 'react';

function StepFour({ formData, onComplete, onPrevious }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleVerification = () => {
    const otpCode = otp.join('');
    if (otpCode.length === 6) {
      onComplete(formData);
    }
  };

  useEffect(() => {
    const otpCode = otp.join('');
    if (otpCode.length === 6) {
      handleVerification();
    }
  }, [otp]);

  return (
    <div className="app-container">
      <div className="left-section">
        <div className="character-illustration">
          <div className="character-avatar">
            <div className="security-icon shield-icon">🛡️</div>
            <div className="security-icon lock-icon">🔒</div>
          </div>
        </div>
      </div>

      <div className="right-section">
        <div className="verification-container">
          <div className="verification-header">
            <div className="verification-icon">💬</div>
            <h2 className="verification-title">Two Step Verification</h2>
            <p className="verification-text">
              We sent a verification code to your Email Address. Enter the code in the field below.
            </p>
            <p className="email-display">
              {formData.email.substring(0, 6)}***@gmail.com
            </p>
          </div>

          <div>
            <label className="form-label" style={{textAlign: 'center', display: 'block', marginBottom: '16px'}}>
              Type your 6 digit security code
            </label>
            <div className="otp-inputs">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  className="otp-input"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                />
              ))}
            </div>
          </div>

          <button 
            className="btn btn-primary" 
            style={{width: '100%', justifyContent: 'center'}}
            onClick={handleVerification}
            disabled={otp.join('').length < 6}
          >
            Verify My Account
          </button>

          <div className="resend-link">
            Didn't get the code? <a>Resend</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StepFour;
