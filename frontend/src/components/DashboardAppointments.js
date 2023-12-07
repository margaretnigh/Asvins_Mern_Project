import "../css/Dashboard.css";
import Appointment from './Appointment';
import Sidebar from './Sidebar';
import AppointmentForm from './AppointmentForm';
import { UserAuth } from "../context/AuthContext";
import Calendar from 'react-calendar';
import React, { useState, useEffect } from 'react';
import userIcon from "../images/userIcon.png";
import 'react-calendar/dist/Calendar.css';

function DashboardAppointments() {

    const { userInfo, changeUserInfo } = UserAuth();
const [doctors, setDoctors] = useState([]);
const [appointments, setAppointments] = useState([]);

const user = [{
    image: userInfo.photo === 'no-photo.jpg' ? userIcon : userInfo.photo,
    name: userInfo.fullname,
    title: "Patient",
},];

const getDoctors = async () => {
    try {
        const newDoctors = [];
        // Use Promise.all to wait for all asynchronous operations to complete
        await Promise.all(userInfo.doctorsworked.map(async (doctorID) => {
            const response = await fetch('https://asvins.onrender.com/api/v1/doctors/' + doctorID, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            console.log("HERE AGAIN", doctorID);

            if (!response.ok) {
                console.log('Network response was not ok');
            } else {
                const data = await response.json();
                console.log("DATA: ", data);
                newDoctors.push(data.data);
            }
        }));

        setDoctors(newDoctors);

    } catch (e) {
        console.error(e);
    }
};

const formatDateTime = (dateTimeString) => {
    const [datePart, timePart] = dateTimeString.split('.');
    console.log('Date Part:', datePart.trim()); // Output: "Dec 5, 2023"
    console.log('Time Part:', timePart.trim()); // Output: "12 PM EST"
    return { datePart, timePart };
};

const getMonthIndex = (month) => {
    const monthAbbreviationsToFull = {
        'Jan': 'January',
        'Feb': 'February',
        'Mar': 'March',
        'Apr': 'April',
        'May': 'May',
        'Jun': 'June',
        'Jul': 'July',
        'Aug': 'August',
        'Sep': 'September',
        'Oct': 'October',
        'Nov': 'November',
        'Dec': 'December',
    };

    if (monthAbbreviationsToFull[month] !== undefined) {
        return monthAbbreviationsToFull[month]
    }
    return;
}



const [dateCal, setDateCal] = useState(new Date());

var formattedAppointments =  [];
if (doctors.length > 0) {
    formattedAppointments = appointments
        .map((appt) => {
            // Check if doctors array is not empty before accessing its elements
            if (doctors.length > 0) {
                const { timePart, datePart } = formatDateTime(appt);
                var hour = String(timePart).slice(1, 3);
                if (hour.trim().length === 1) {
                    hour = "0" + hour.trim();
                }
                console.log("DateCal: ", dateCal);
                const formattedTime = `${hour}:00:00`
                const datePieces = datePart.split(' ');
                const abbrevMonth = datePieces[0];
                const month = getMonthIndex(abbrevMonth.trim());
                var day = datePieces[1].slice(0, 1);
                if (day.trim().length === 1) {
                    day = "0" + day.trim();
                }
                const year = datePieces[1].slice(3, datePieces[1].length);
                const formattedDate = month + " " + day + ", " + year + " " + formattedTime;
                console.log("Date: ", formattedDate);
                const dateObject = new Date(formattedDate);
                console.log("new appt date", dateObject);

                // Check if datePart is valid
                if (dateObject && (dateObject.getDay() === dateCal.getDay()) && (dateObject.getMonth() === dateCal.getMonth()) && (dateObject.getFullYear === dateCal.getFullYear)) {
                    return {
                        doctor: doctors[0].fullname,
                        photo: doctors[0].photo === 'no-photo.jpg' ? userIcon : doctors[0].photo,
                        address: doctors[0].address,
                        time: timePart,
                        date: datePart,
                    };

                } else {
                    console.error('DatePart null or not today');
                    return null; // or provide default values as needed
                }
            } else {
                // Handle the case when doctors array is empty
                console.error('Doctors array is empty');
                return null; // or provide default values as needed
            }
        });
}

console.log("formatted appointments: ", formattedAppointments);

useEffect(() => {

    getDoctors();
    if (userInfo.appointments) {
        setAppointments(userInfo.appointments);
    }
}, [userInfo]);


const [formData, setFormData] = useState({
    dob: '',
    address: '',
    symptoms: '',
    sex: '',
    conditions: [],
});

const handleInputChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
};

const handleDateChange = (selectedDate) => {
    setDateCal(selectedDate);
};

    return (
        <div className="app">
        <div className="container">
            <Sidebar user={user} />
            <div className='container'>
            <div className='content'>

                    <div className="calendar-container">
                        <Calendar
                            onChange={handleDateChange}
                            value={dateCal}
                            className="calendar"
                        />
                        <div style={{ display: 'flex' }}>
                            <div><p style={{ color: '#777', fontSize: '18px', paddingRight: '10px' }}>Appointments on</p></div>
                            <div><p style={{ color: '#056DDC', fontSize: '18px', fontWeight: 'bold' }}>{dateCal.toDateString()}</p></div>


                        </div>
                    </div>
                    <div className='apptForm'>
                        {formattedAppointments[0] && (formattedAppointments.map((appointment, index) => (
                            <Appointment key={index} {...appointment} />
                        )))}
                        <h5>Create a New Appointment</h5>
                        <AppointmentForm userInfo={userInfo} doctorsWorked={doctors} />
                    </div>
                </div>
        </div>
        </div>
    </div>
)} 

export default DashboardAppointments;