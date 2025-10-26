import React, { useState } from 'react';

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

function StepThree({ formData, setFormData, onNext, onPrevious }) {
  const [errors, setErrors] = useState({});
  const [showCVV, setShowCVV] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces every 4 digits
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setFormData(prev => ({
        ...prev,
        [name]: formatted
      }));
    }
    // Format expiry date as MM/YY
    else if (name === 'expiryDate') {
      let formatted = value.replace(/\D/g, '');
      if (formatted.length >= 2) {
        formatted = formatted.slice(0, 2) + '/' + formatted.slice(2, 4);
      }
      setFormData(prev => ({
        ...prev,
        [name]: formatted
      }));
    }
    else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.cardHolderName.trim()) {
      newErrors.cardHolderName = 'Card holder name is required';
    }

    const cardNumberDigits = formData.cardNumber.replace(/\s/g, '');
    if (!cardNumberDigits) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(cardNumberDigits)) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }

    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Format should be MM/YY';
    }

    if (!formData.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3}$/.test(formData.cvv)) {
      newErrors.cvv = 'CVV must be 3 digits';
    }

    if (!formData.billingAddress.trim()) {
      newErrors.billingAddress = 'Billing address is required';
    }

    if (!formData.billingCity.trim()) {
      newErrors.billingCity = 'City is required';
    }

    if (!formData.billingPincode) {
      newErrors.billingPincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.billingPincode)) {
      newErrors.billingPincode = 'Pincode must be 6 digits';
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
          <h2 style={{fontSize: '28px', marginBottom: '10px'}}>Secure Payment</h2>
          <p style={{color: '#8a94a6'}}>Your information is encrypted and secure</p>
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
          <div className="step active">
            <div className="step-icon">👤</div>
            <div className="step-info">
              <h3>Personal</h3>
              <p>Enter Information</p>
            </div>
          </div>
          <div className="step active">
            <div className="step-icon">💳</div>
            <div className="step-info">
              <h3>Billing</h3>
              <p>Payment Details</p>
            </div>
          </div>
          <div className="step">
            <div className="step-icon">✓</div>
            <div className="step-info">
              <h3>Verify</h3>
              <p>Complete Setup</p>
            </div>
          </div>
        </div>

        <div className="form-container">
          <h1 className="form-title">Billing & Payment Information</h1>
          <p className="form-subtitle">Enter Your Payment Details</p>

          <div className="form-group">
            <label className="form-label">Card Holder Name</label>
            <input
              type="text"
              name="cardHolderName"
              className="form-input"
              placeholder="John Doe"
              value={formData.cardHolderName}
              onChange={handleChange}
            />
            {errors.cardHolderName && <div className="error-message">{errors.cardHolderName}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              className="form-input"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={handleChange}
              maxLength="19"
            />
            {errors.cardNumber && <div className="error-message">{errors.cardNumber}</div>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Expiry Date</label>
              <input
                type="text"
                name="expiryDate"
                className="form-input"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={handleChange}
                maxLength="5"
              />
              {errors.expiryDate && <div className="error-message">{errors.expiryDate}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">CVV</label>
              <div className="input-wrapper">
                <input
                  type={showCVV ? 'text' : 'password'}
                  name="cvv"
                  className="form-input"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={handleChange}
                  maxLength="3"
                />
                <span 
                  className="password-toggle"
                  onClick={() => setShowCVV(!showCVV)}
                >
                  {showCVV ? '👁️' : '👁️‍🗨️'}
                </span>
              </div>
              {errors.cvv && <div className="error-message">{errors.cvv}</div>}
            </div>
          </div>

          <h2 style={{fontSize: '24px', marginTop: '40px', marginBottom: '20px', color: '#8B7FFF'}}>
            Billing Address
          </h2>

          <div className="form-group">
            <label className="form-label">Address</label>
            <input
              type="text"
              name="billingAddress"
              className="form-input"
              placeholder="3-120, Street Name"
              value={formData.billingAddress}
              onChange={handleChange}
            />
            {errors.billingAddress && <div className="error-message">{errors.billingAddress}</div>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">City</label>
              <input
                type="text"
                name="billingCity"
                className="form-input"
                placeholder="Hyderabad"
                value={formData.billingCity}
                onChange={handleChange}
              />
              {errors.billingCity && <div className="error-message">{errors.billingCity}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">State</label>
              <select
                name="billingState"
                className="form-input"
                value={formData.billingState}
                onChange={handleChange}
              >
                {INDIAN_STATES.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Pincode</label>
            <input
              type="text"
              name="billingPincode"
              className="form-input"
              placeholder="500070"
              value={formData.billingPincode}
              onChange={handleChange}
              maxLength="6"
            />
            {errors.billingPincode && <div className="error-message">{errors.billingPincode}</div>}
          </div>

          <div className="form-navigation">
            <button className="btn btn-secondary" onClick={onPrevious}>
              ← Previous
            </button>
            <button className="btn btn-primary" onClick={handleNext}>
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StepThree;
