import React, { useState } from 'react';

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

function StepTwo({ formData, setFormData, onNext, onPrevious }) {
  const [errors, setErrors] = useState({});

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
if (!formData.name || !formData.name.trim()) {
  newErrors.name = 'Name is required';
}

if (!formData.organizationName || !formData.organizationName.trim()) {
  newErrors.organizationName = 'Organisation name is required';
}

   

    if (!formData.residencePincode) {
      newErrors.residencePincode = 'Residence pincode is required';
    } else if (!/^\d{6}$/.test(formData.residencePincode)) {
      newErrors.residencePincode = 'Pincode must be 6 digits';
    }

    if (!formData.companyPincode) {
      newErrors.companyPincode = 'Company pincode is required';
    } else if (!/^\d{6}$/.test(formData.companyPincode)) {
      newErrors.companyPincode = 'Pincode must be 6 digits';
    }

    if (!formData.gstn.trim()) {
      newErrors.gstn = 'GSTN is required';
    }

    if (!formData.companyAddress.trim()) {
      newErrors.companyAddress = 'Company address is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
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
          <h2 style={{ fontSize: '28px', marginBottom: '10px' }}>Join Us Today</h2>
          <p style={{ color: '#8a94a6' }}>Create your account in just 3 steps</p>
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
         
        </div>

        <div className="form-container">
          <h1 className="form-title">Personal & Organisation Information</h1>
          <p className="form-subtitle">Enter Your Personal & Organisation Details</p>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-input"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <div className="error-message">{errors.name}</div>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Organisation Name</label>
              <input
                type="text"
                name="organizationName"
                className="form-input"
                placeholder="Organisation Name"
                value={formData.organizationName}
                onChange={handleChange}
              />
              {errors.organizationName && (
                <div className="error-message">{errors.organizationName}</div>
              )}
            </div>


            <div className="form-group">
              <label className="form-label">Residence Pincode</label>
              <input
                type="text"
                name="residencePincode"
                className="form-input"
                placeholder="500070"
                value={formData.residencePincode}
                onChange={handleChange}
              />
              {errors.residencePincode && <div className="error-message">{errors.residencePincode}</div>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Company Pincode</label>
              <input
                type="text"
                name="companyPincode"
                className="form-input"
                placeholder="500079"
                value={formData.companyPincode}
                onChange={handleChange}
              />
              {errors.companyPincode && <div className="error-message">{errors.companyPincode}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">GSTN</label>
              <input
                type="text"
                name="gstn"
                className="form-input"
                placeholder="XYZ123123A"
                value={formData.gstn}
                onChange={handleChange}
              />
              {errors.gstn && <div className="error-message">{errors.gstn}</div>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Company Address</label>
            <input
              type="text"
              name="companyAddress"
              className="form-input"
              placeholder=" Choutuppal, Hyderabad"
              value={formData.companyAddress}
              onChange={handleChange}
            />
            {errors.companyAddress && <div className="error-message">{errors.companyAddress}</div>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">City</label>
              <input
                type="text"
                name="city"
                className="form-input"
                placeholder="Hyderabad"
                value={formData.city}
                onChange={handleChange}
              />
              {errors.city && <div className="error-message">{errors.city}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">State</label>
              <select
                name="state"
                className="form-input"
                value={formData.state}
                onChange={handleChange}
              >
                {INDIAN_STATES.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
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

export default StepTwo;
