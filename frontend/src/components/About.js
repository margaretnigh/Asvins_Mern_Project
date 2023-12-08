import React from 'react';
import NavBar from './/Nav.js';
import "../css/About.css";

function About() {
  return (
    <div className='about-container'>
      <NavBar/>
      <main className='about'>
        <h1>Welcome to Asvins Healthcare Management System</h1>
        <p>
          Asvins is a state-of-the-art healthcare management system designed to streamline and optimize healthcare operations.
          Our system offers a wide range of features to improve the efficiency and quality of patient care and healthcare administration.
        </p>
        <h2>Key Features:</h2>
        <ul>
          <li>Appointment Scheduling</li>
          <li>Patient Records Management</li>
          <li>Prescription Management</li>
          <li>Billing and Invoicing</li>
          <li>Report Generation</li>
          <li>Secure Data Storage</li>
        </ul>
        <p>
          Whether you are a healthcare provider or an administrator, Asvins will help you manage your healthcare facility more effectively and provide better patient care.
        </p>
      </main>
    </div>
  );
}

export default About;