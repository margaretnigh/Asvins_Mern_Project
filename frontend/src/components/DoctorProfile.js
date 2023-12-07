import React from 'react';
import "../css/Profile.css";
import Location from "../images/location.svg";
import Rating from "../images/star.svg";
import Specialties from "../images/specialties.svg";

function DoctorProfile({ image, name = 'Unknown', specialties = [], location = 'Unknown Location', rating, id, onButtonClick, button = true }) {
    const handleButtonClick = () => {
        onButtonClick(id);
    };

    return (
    <div className="profile-card-doc">
        <img src={image} alt="Profile Picture" className="profile-picture"/>
        <div className="profile-info">
            <div className="profile-name">{name}</div>
            <div className="profile-description">
                <div className="icon">
                    <img src={Location} />
                </div>
                {location}
            </div>
            <div className='profile-description'>
                <div className="icon">
                    <img src={Rating} />
                </div>
                {rating}
            </div>
            <div className="profile-description">
                <div className="specialties" style={{ marginTop: '8px' }}>
                    <div className="icon">
                        <img src={Specialties} />
                    </div>
                    {specialties.map((item, index) => (
                    <span key={index}>{item}</span>
                ))}
                </div>
            </div>
        </div>
        {button == true && <button className="button-small" onClick={handleButtonClick}>Add</button>}
    </div>
  );
}

export default DoctorProfile;
