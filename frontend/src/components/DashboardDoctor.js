import React, { useEffect, useState } from "react";
import "../css/Dashboard.css";
import "../css/Profile.css";
import Profile from "./Profile-Preview";
import Calender from "./Calendar";
import Appointment from "./Appointment";
import SidebarDoctor from "./SidebarDoctor";
import { useLocation } from "react-router-dom";
import axios from "axios";

function DashboardDoctor() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);

  const loc = useLocation();
  const doc = loc.state.doctor;
  console.log(doc);

  const generateDummyPatients = () => {
    const dummyPatients = [
      {
        name: "John Doe",
        title: "Mr.",
        profile_link: "https://example.com/profiles/john",
        image: "https://www.shutterstock.com/image-vector/young-man-avatar-character-260nw-661669825.jpg"
    },
      {
        name: "Jane Smith",
        title: "Ms.",
        profile_link: "https://example.com/profiles/jane",
        image: "https://static.vecteezy.com/system/resources/previews/002/002/257/non_2x/beautiful-woman-avatar-character-icon-free-vector.jpg"
      },
      {
        name: "Bob Johnson",
        title: "Mr.",
        profile_link: "https://example.com/profiles/bob",
        image: "https://as2.ftcdn.net/v2/jpg/02/23/50/73/1000_F_223507324_jKl7xbsaEdUjGr42WzQeSazKRighVDU4.jpg"
    },
    ];

    setPatients(dummyPatients);
  };

  // Function to generate dummy appointments related to patients
  const generateDummyAppointments = () => {
    const dummyAppointments = patients.map((patient, index) => {
      const currentTime = new Date();
      currentTime.setHours(currentTime.getHours() + index); // Adjust time for each appointment

      return {
        time: `${currentTime.getHours()}:${currentTime.getMinutes()}`,
        date: `${currentTime.getDate()}/${
          currentTime.getMonth() + 1
        }/${currentTime.getFullYear()}`,
        doctor: patient.name,
        address: "123 Medical Center",
        photo:
          patient.image,
      };
    });

    setAppointments(dummyAppointments);
  };

  useEffect(() => {
    generateDummyPatients();
  }, []);

  useEffect(() => {
    if (patients.length > 0) {
      generateDummyAppointments();
    }
  }, [patients]);
  return (
    <div className="app">
      <div className="container">
        <SidebarDoctor doc={doc} appointments={appointments} />
        <div className="container">
          <div className="content">
            <h3>Welcome Dr. {doc.fullname} </h3>
            <p>
              Stay up to date with your appointments, patients and other
              information all in one place.
            </p>

            <div className="block">
              <h3>Your Patients</h3>
              {patients.length === 0 ? (
                <>
                  <p>No patients currently available</p>
                </>
              ) : (
                <>
                  <p className="div">See your current patients here.</p>
                  {patients.map((patients, index) => (
                    <Profile key={index} {...patients} />
                  ))}
                </>
              )}
              <div style={{ textAlign: "right" }}></div>
            </div>
            <div className="block">
              <h3>
                Available Beds{" "}
                <img
                  src="https://thumbs.dreamstime.com/z/hospital-bed-linear-icon-thin-line-illustration-vector-isolated-outline-drawing-93593969.jpg?w=768"
                  alt=""
                  width={70}
                  height={40}
                ></img>
              </h3>
              <p className="div">
                Current bed availibility of the hospital can be checked here
                <br></br>
                <h5>Total Beds : 80</h5>
                <h5>Available Beds : 24</h5>
                <h5>Occupied Beds : 56</h5>
              </p>
              {/* {bedAvail.map((bedAvail, index) => (
                        <Profile key={index} {...bedAvail} />
                    ))} */}
              {/* <div style={{textAlign: 'right'}}>
                        <button className="button-small">
                            <div className="text-wrapper-2">Chat with Provider</div>
                        </button>
                    </div> */}
            </div>
            {/* <div className="block">
                    <h5>Your Health</h5>
                    <p>Edit your healthcare information</p>
                    
                    <MultiSelectForm options={options}/>
                    <MultiSelectForm options={options}/>


                </div> */}
          </div>
        </div>
        <div className="content">
          <Calender />

          {/* {appointments.length > 0 &&
            appointments.map((appointment, index) => (
              <Appointment key={index} {...appointment} />
            ))} */}
        </div>
      </div>
    </div>
  );
}

export default DashboardDoctor;