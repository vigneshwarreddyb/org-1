import React, { useState, useEffect } from "react";
import axios from "axios";

import Login from "./components/Login";
import HomePage from "./components/HomePage";
import StepOne from "./components/StepOne";
import StepTwo from "./components/StepTwo";

const api = "http://localhost:8000/api";

function App() {
  const [currentPage, setCurrentPage] = useState("login");
  const [currentStep, setCurrentStep] = useState(1);
  const [currentUser, setCurrentUser] = useState(null);

  const [formData, setFormData] = useState({
    number: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    name: "",
    organizationName: "",
    gstn: "",
    companyAddress: "",
    companyPincode: "",
    city: "",
    state: ""
  });

  // 🔁 Auto-login
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) return;

    axios.get(api + "/auth/me/", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setCurrentUser(res.data.data);
      setCurrentPage("home");
    })
    .catch(() => {
      localStorage.clear();
      setCurrentPage("login");
    });
  }, []);

  // 🔐 LOGIN
  const handleLogin = async (mobile, password) => {
    try {
      const res = await axios.post(api + "/auth/login/", { mobile, password });

      localStorage.setItem("access", res.data.tokens.access);
      localStorage.setItem("refresh", res.data.tokens.refresh);

      const profile = await axios.get(api + "/auth/me/", {
        headers: { Authorization: `Bearer ${res.data.tokens.access}` }
      });

      setCurrentUser(profile.data.data);
      setCurrentPage("home");

      return { success: true };
    } catch {
      return { success: false, error: "Invalid mobile or password" };
    }
  };
   const handleRegistrationComplete = async () => {
    try {
      // ✅ Backend payload mapping
      const payload = {
        mobile: formData.number,
        email: formData.email,
        password: formData.password,

        organisation_name: formData.organizationName,
        gst_number: formData.gstn,
        authorised_person_name: formData.name,

        address: formData.companyAddress,
        city: formData.city,
        state: formData.state,
        pincode: formData.companyPincode,

        disclaimer_accepted: true
      };

      await axios.post(
        "http://localhost:8000/api/auth/register/",
        payload
      );

      alert("Registration successful. Please login.");
      setCurrentPage("login");
      setCurrentStep(1);

    } catch (err) {
      console.error(err.response?.data);
      alert(JSON.stringify(err.response?.data || "Registration failed"));
    }
  };


  // 🚪 LOGOUT
  const handleLogout = () => {
    localStorage.clear();
    setCurrentUser(null);
    setCurrentPage("login");
  };

  return (
    <>
      {currentPage === "login" && (
        <Login onLogin={handleLogin} onNavigateToRegister={() => {
          setCurrentPage("register");
          setCurrentStep(1);
        }} />
      )}

      {currentPage === "home" && (
        <HomePage user={currentUser} onLogout={handleLogout} />
      )}

      {currentPage === "register" && currentStep === 1 && (
        <StepOne formData={formData} setFormData={setFormData} onNext={() => setCurrentStep(2)} />
      )}

      {currentPage === "register" && currentStep === 2 && (
        <StepTwo formData={formData} setFormData={setFormData}
          onNext={handleRegistrationComplete}
          onPrevious={() => setCurrentStep(1)}
        />
      )}
    </>
  );
}

export default App;
