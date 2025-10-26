import React, { useState } from 'react';
import Login from './components/Login';
import HomePage from './components/HomePage';
import StepOne from './components/StepOne';
import StepTwo from './components/StepTwo';
import StepThree from './components/StepThree';
import StepFour from './components/StepFour';

const GaneshKing = {
  email: "ganesh.1234@gmail.com",
  password: "ganesh1234",
  username: "Ganesh1122",
  companyName: "Ganesh Company p.Ltd",
  firstName: "ganesh",
  lastName: "king",
  mobile: "1234567890",
  residencePincode: "508114",
  companyPincode: "508115",
  gstn: "ganesh1258",
  companyAddress: "3-120, Hyderabad",
  city: "Hyderabad",
  state: "Telangana",

  cardHolderName: "Ganesh king",
  cardNumber: "1234567890987654",
  expiryDate: "12/25",
  cvv: "123",
  billingAddress: "3-120, Hyderabad",
  billingCity: "Hyderabad",
  billingState: "Telangana",
  billingPincode: "500070"
};

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [currentStep, setCurrentStep] = useState(1);
  const [registeredUsers, setRegisteredUsers] = useState([GaneshKing]);
  const [currentUser, setCurrentUser] = useState(null);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    firstName: '',
    lastName: '',
    mobile: '',
    residencePincode: '',
    companyPincode: '',
    gstn: '',
    companyAddress: '',
    city: '',
    state: 'Telangana',

    cardHolderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    billingCity: '',
    billingState: 'Telangana',
    billingPincode: ''
  });

  const handleLogin = (email, password) => {
    const user = registeredUsers.find(
      u => u.email === email && u.password === password
    );

    if (user) {
      setCurrentUser(user);
      setCurrentPage('home');
      return { success: true };
    } else {
      return { success: false, error: 'Invalid email or password' };
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('login');
  };

  const handleRegistrationComplete = (userData) => {
    setRegisteredUsers(prev => [...prev, userData]);
    setCurrentUser(userData);
    setCurrentPage('home');

    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      companyName: '',
      firstName: '',
      lastName: '',
      mobile: '',
      residencePincode: '',
      companyPincode: '',
      gstn: '',
      companyAddress: '',
      city: '',
      state: 'Telangana',
      cardHolderName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      billingAddress: '',
      billingCity: '',
      billingState: 'Telangana',
      billingPincode: ''
    });
    setCurrentStep(1);

    console.log('Registration Successful!', userData);
  };

  const navigateToRegister = () => {
    setCurrentPage('register');
    setCurrentStep(1);
  };

  const navigateToLogin = () => {
    setCurrentPage('login');
  };

  if (currentPage === 'login') {
    return (
      <Login
        onLogin={handleLogin}
        onNavigateToRegister={navigateToRegister}
      />
    );
  }

  if (currentPage === 'home') {
    return (
      <HomePage
        user={currentUser}
        onLogout={handleLogout}
      />
    );
  }


  if (currentPage === 'register') {
    if (currentStep === 1) {
      return (
        <StepOne
          formData={formData}
          setFormData={setFormData}
          onNext={() => setCurrentStep(2)}
          onNavigateToLogin={navigateToLogin}
        />
      );
    }

    if (currentStep === 2) {
      return (
        <StepTwo
          formData={formData}
          setFormData={setFormData}
          onNext={() => setCurrentStep(3)}
          onPrevious={() => setCurrentStep(1)}
        />
      );
    }

    if (currentStep === 3) {
      return (
        <StepThree
          formData={formData}
          setFormData={setFormData}
          onNext={() => setCurrentStep(4)}
          onPrevious={() => setCurrentStep(2)}
        />
      );
    }

    if (currentStep === 4) {
      return (
        <StepFour
          formData={formData}
          onComplete={handleRegistrationComplete}
          onPrevious={() => setCurrentStep(3)}
        />
      );
    }
  }

  return null;
}

export default App;
