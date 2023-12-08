import Sidebar from './Sidebar';
import DoctorProfile from './DoctorProfile';
import "../css/Search.css";
import MultiSelectForm from './MultiSelectForm';
import React, { useState, useEffect } from 'react';
import { UserAuth } from "../context/AuthContext";
import axios from "axios";

function PatientSearch() {

    const [searchTerm, setSearchTerm] = React.useState("");
    const handleChange = event => { setSearchTerm(event.target.value); };
    const [searchResults, setSearchResults] = React.useState([]);

    const [patients, setPatients] = useState([]);

    const { userInfo } = UserAuth();
    console.log(userInfo);
    const user = [{
        image: 'http://placekitten.com/g/200/300',
        name: userInfo.fullname,
        title: 'Doctor',
    },];

    useEffect(() => {
        const fetchDoctors = async () => {
          try {
            await axios.get(`http://localhost:3000/api/v1/doctors/${userInfo._id}/patientsworked`)
      
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchDoctors(); // Call the fetchData function when the component mounts
    }, []);
    
    const handleSearch = (event) => {
      event.preventDefault();
  
      // Apply the filter logic here
      const newFilteredDoctors = patients.filter((doctor) => {
        // Customize this condition based on your requirements
        const specialtiesLower = doctor.specialties.map(specialty => specialty.toLowerCase());
  
        return (
          doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          specialtiesLower.includes(searchTerm.toLowerCase())
        );
      });
  
      // Update the state with the filtered doctors
      setPatients(newFilteredDoctors);
    };
      
    
    // form options
    const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
    
    

    console.log(searchTerm);
    
    return (
        <div className="app">
            <div className="container">
                <Sidebar user={user} />
                <div className='container'>
                    <div className="content">
                        <h3>Search for Doctors</h3>
                        <p>Search for a doctor that will fit your needs.</p>
                    
                    <form onSubmit={handleSearch}>
                    <div className="search">
                    <div className="searchbar">
                        <input
                        type="text"
                        placeholder="Search for Doctors by Name, Location, Specialties..."
                        value={searchTerm}
                        onChange={handleChange}
                        />
                    </div>
                    
                    <div className="filtering">
                        <MultiSelectForm options={options}/>
                    </div>
                    <button variant="primary" type="submit" className="button-small">Search</button>
                    </div>
                    </form>

                    {patients.map((doctor, index) => (
                        <DoctorProfile key={index} {...doctor} />
                    ))}

                </div>
                </div>
            </div>
        </div>
    )
}
export default PatientSearch;