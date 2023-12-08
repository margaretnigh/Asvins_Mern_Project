import React from 'react';
import "../css/Dashboard.css";
import logo from "../images/heart_logo.svg";
import Profile from "./Profile-Preview";
import {Link, useNavigate} from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

function SidebarDoctor({doc, appointments}) {
    // Leaving this commenting in case you need it here
    // const {user} = UserAuth();
    const { logOut } = UserAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        try {
          logOut();
          navigate("/");
        } catch(err) {
          console.error(err);
        }
      }

    return (
        <div>
            <div className='user'>
            <Profile image="https://st5.depositphotos.com/1748586/65901/v/450/depositphotos_659011646-stock-illustration-medicine-concept-young-woman-doctor.jpg"{...doc}/>
            </div>

            <div className="sidebar">
            <div className="logo">
                    <img src={logo} alt="Asvins" />
                    <div className="logo-text">asvins</div>
            </div>
            
            {/* <Route path="/doctor-dashboard/appointments" element={<DashboardAppointments />} />
              <Route path="/doctor-dashboard/doctors" element={<PatientSearch />} />
              <Route path="/doctor-dashboard" element={<DashboardDoctor/>}/>
              <Route path="/doctor-dashboard/appointment" element={<DoctorAppointments/>}/> */}

            <ul className="sidebar-items">
            <li><Link to="/doctor-dashboard" state={{doctor:doc}}>Health</Link></li>
                <li><Link to="/doctor-dashboard/appointment" state={
                {
                    appointments,
                    doc
                }
                }>Appointments</Link></li>
                <li><Link to="/chat">Chat</Link></li>
                {/* <li><Link to="/dashboard/doctors">Doctors</Link></li> */}
                <button className='logout' onClick={handleLogout} style={{backgroundColor: '#e40000'}}>Logout</button>
            </ul>
            </div>
        </div>
    );
      }
  
export default SidebarDoctor;