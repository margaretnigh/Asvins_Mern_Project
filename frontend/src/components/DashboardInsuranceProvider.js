import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';  // Import axios
import '../css/Dashboard.css';
import '../css/Profile.css';
import Profile from './InsuranceProfile-Preview';
import { UserAuth } from "../context/AuthContext";
import InsuranceProviderSidebar from './InsuranceProviderSidebar';
import userIcon from "../images/userIcon.png";

// const user = [{
//   image: 'https://placebear.com/200/300',
//   name: 'Sumanth',
//   title: 'Insurance Provider',
// },];

function DashboardInsuranceProvider() {

  // const { userInfo, changeUserInfo } = UserAuth();
  // console.log("user: " + userInfo.fullname);
  // console.log("user: " + userInfo.emailid);
  // console.log("user: " + userInfo._id);
  // console.log("Doctors worked: " + userInfo.patientsworked);

  // console.log(userInfo, changeUserInfo);
  // const user = [{
  //     image: userInfo.photo === 'no-photo.jpg' ? userIcon : userInfo.photo,
  //     name: userInfo.fullname,
  //     title: "Patient",
  // },];

  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [updatedPolicy, setUpdatedPolicy] = useState('');

  // useEffect(() => {
  //   const fetchPatients = async () => {
  //     try {
  //       const response = await axios.get('https://asvins.onrender.com/api/v1/patients');
  //       console.log('API Response:', response);
  //       setPatients(response.data.data);
  //     } catch (error) {
  //       console.error('Error fetching patient data:', error);
  //     }
  //   };
  
  //   fetchPatients(); // Call the function when the component mounts
  // }, []); // Empty dependency array means this effect runs once after the initial render
  
  // console.log("hii")
  // console.log(patients)

  const { userInfo, changeUserInfo } = UserAuth();
  console.log("user: " + userInfo.fullname);
  console.log("user: " + userInfo.emailid);
  console.log("user: " + userInfo._id);
  console.log("Doctors worked: " + userInfo.patientsworked);

  console.log(userInfo);
  const user = [{
      image: `backend/public/uploads/${userInfo.photo}` === 'no-photo.jpg' ? userIcon : userInfo.photo,
      name: userInfo.fullname,
      title: "Insurance Provider",
  },];

  const [patient, setpatients] = useState([]);
  // const [insuranceProviders, setInsuranceProviders] = useState([]);
  // const [appointments, setAppointments] = useState([]);

  const getPatients = async () => {
      try {
          const newPatients = [];
          // Use Promise.all to wait for all asynchronous operations to complete
          await Promise.all(userInfo.patientsworked.map(async (patientID) => {
              const response = await fetch('https://asvins.onrender.com/api/v1/patients/', {
                  method: 'GET',
                  headers: { 'Content-Type': 'application/json' },
              });
              console.log("HERE AGAIN", patientID);

              if (!response.ok) {
                  console.log('Network response was not ok');
              } else {
                  const data = await response.json();
                  console.log("DATA: ", data);
                  newPatients.push(data.data);
              }
          }));

          setPatients(newPatients);

      } catch (e) {
          console.error(e);
      }
  };
  useEffect(() => {

    getPatients();
    // if (userInfo.appointments) {
    //     setAppointments(userInfo.appointments);
    // }
}, [userInfo]);
  const handleClosePolicyModal = () => {
    setSelectedPatient(null);
    setUpdatedPolicy('');
  };

  const handleUpdatePolicy = () => {
    // Implement your logic to update the policy here
    console.log(`Updating policy for patient: ${selectedPatient.name}`);
    handleClosePolicyModal(); // Close the modal after updating the policy
  };

  return (
    <div className="app">
      <div className="container">
        <InsuranceProviderSidebar user={user} />
        <div className="container">
          <div className="content">
            <h2>Welcome {user[0].name}</h2>
            <p>Stay up to date with your appointments, patients, and insurance information all in one place.</p>
            <div className="block">
              <h4>Your Patients</h4>
              <p className="div">See your current patients and their insurance plans according to their health records.</p>
              <Profile {...userInfo}/>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="covid-updates-button-container">
            <Link to="/covid-updates">
              <button className="button-large covid-updates-button">View COVID-19 Updates</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Modal for updating policy */}
      {selectedPatient && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleClosePolicyModal}>
              &times;
            </span>
            <h3>Update Policy for {selectedPatient.name}</h3>
            {/* Display the updated policy on the webpage */}
            <p>{updatedPolicy}</p>
            {/* Add your form or UI elements for updating the policy */}
            <button onClick={handleUpdatePolicy}>Update Policy</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardInsuranceProvider;
