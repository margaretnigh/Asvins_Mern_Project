import { useLocation } from "react-router-dom";
import SidebarDoctor from "./SidebarDoctor";
import Calender from "./Calendar";
import Appointment from "./Appointment";

function DoctorAppointments() {
    const loc=useLocation()
    console.log(loc.state)
    const appointments=loc.state.appointments;
    const doc=loc.state.doc;
    return (
        <div className="app">
        <div className="container">
            <SidebarDoctor doc={doc} appointments={appointments}/>
            <div className='container'>
            <div className="content">
                <h3>Welcome Dr. {doc.fullname}</h3>
                <p>Stay up to date with your appointments.</p>
                <div className="full-calender">
                    <Calender/>
                </div>
                {appointments.length===0?<>
                <p>Currently you have no appointment scheduled</p>
                </>:appointments.map((appointment, index) => (
                    <Appointment key={index} {...appointment} />
                ))}
            </div>
        </div>
        </div>
    </div>
)} 
export default DoctorAppointments;