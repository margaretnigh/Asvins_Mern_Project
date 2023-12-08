import React from 'react';
import "../css/Profile.css";
import { Link } from 'react-router-dom';

function InsuranceProfile_Preview({ patientsworked, fullname, emailid, phone, title, policy, profile_link, insurancePackage }) {
  const randomImageURL = `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}`;

  const insuranceProvider = insurancePackage ? insurancePackage.insuranceProvider : '';
  const policyNumber = insurancePackage ? insurancePackage.policyNumber : '';
  const coverageType = insurancePackage ? insurancePackage.coverageType : '';
  const coverageAmount = insurancePackage ? insurancePackage.coverageAmount : '';

  return (
    <Link to={profile_link}>
      <div className="profile-card" style={{ marginTop: '20px' }}>
        <div className="profile-info">
          {randomImageURL && <img src={randomImageURL} alt="Profile Picture" className="profile-picture" />}

          {patientsworked && <div className="profile-name"><p>Patient ID: {patientsworked}</p></div>}
          {insuranceProvider && <div className="profile-description">Insurance Provider: {insuranceProvider}</div>}
          {policyNumber && <div className="profile-description">Policy Number: {policyNumber}</div>}
          {emailid && <div className="profile-description">Email: {emailid}</div>}
          {phone && <div className="profile-description">Phone: {phone}</div>}
        </div>
      </div>
    </Link>
  );
}

export default InsuranceProfile_Preview;