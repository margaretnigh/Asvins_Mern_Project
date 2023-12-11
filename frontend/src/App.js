import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import necessary components
import Register from './components/Register.js';
import Login from './components/Login.js';
import EnrollMFA from './components/EnrollMFA';
import './css/App.css';
import DashboardPatient from './components/DashboardPatient.js';
import { AuthContextProvider } from './context/AuthContext.js';
import DoctorSearch from './components/DoctorSearch.js';
import InsuranceProviders from './components/InsuranceProviders.js';
import DashboardDoctor from './components/DashboardDoctor.js';
import PatientSearch from './components/PatientSearch.js';
import DashboardAppointments from './components/DashboardAppointments.js';
import RegisterGoogleUser from './components/RegisterGoogleUser.js';
import InsuranceProviderPolicies from './components/InsuranceProviderPolicies.js';
import InsuranceProviderDashboard from './components/DashboardInsuranceProvider.js';
import UserChat from './components/UserChat.js';
import DoctorChat from './components/DoctorChat.js';
import InsuranceChat from './components/InsuranceChat.js';
import DoctorAppointments from './components/DoctorAppointments.js';
import CovidUpdatesPage from './components/CovidUpdatesPage';


function App() {
  return (

    <Router>
      <main className="home">
        <div>
          <AuthContextProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registergoogleuser" element={<RegisterGoogleUser />} />
              <Route path="/enroll" element={<EnrollMFA />} />

              <Route path="/patient-dashboard" element={<DashboardPatient />} />
              <Route path="/patient-dashboard/doctors" element={<DoctorSearch />} />
              <Route path="/patient-dashboard/insurance-providers" element={<InsuranceProviders />} />
              <Route path="/patient-dashboard/appointments" element={<DashboardAppointments />} />
              <Route path="/chat" element={<UserChat />} />

              <Route path="/doctor-dashboard/appointments" element={<DashboardAppointments />} />
              <Route path="/doctor-dashboard/doctors" element={<PatientSearch />} />
              <Route path="/doctor-dashboard" element={<DashboardDoctor/>}/>
              <Route path="/doctor-dashboard/doctor-chat" element={<DoctorChat/>}/>

              <Route path="/InsuranceProviderDashboard" element={<InsuranceProviderDashboard />} />
              <Route path="/InsuranceProviderDashboard/policies" element={<InsuranceProviderPolicies />} />
              <Route path="/covid-updates" element={<CovidUpdatesPage />} />
              <Route path="/InsuranceProviderDashboard/insurance-chat" element={<InsuranceChat/>} />

            </Routes>
          </AuthContextProvider>
        </div>
      </main>
    </Router>

  );
}

export default App;
