import React, { useState, useEffect } from 'react';

const InsuranceProviders = () => {
    const [insurancePackages, setInsurancePackages] = useState([]);
    
    useEffect(() => {
        const fetchInsurancePackages = async () => {
            try {
                const token = getToken();
                const response = await fetch('https://asvins.onrender.com/api/v1/patients/getAllInsurancePackages', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                if (response.ok) {
                    const data = await response.json();
                    setInsurancePackages(data.data || []); // Make sure data.data is an array, or default to an empty array
                } else {
                    console.error('Failed to fetch insurance packages. Response:', response);
                }
            } catch (error) {
                console.error('Error during fetch:', error);
            }
        };
    
        fetchInsurancePackages();
    }, []); // Empty dependency array to run only once on mount
    

    const getToken = () => {
        return localStorage.getItem('token');
    };

    const fetchInsurancePackages = async () => {
        try {
            const token = getToken();
            const response = await fetch('https://asvins.onrender.com/api/v1/patients/getAllInsurancePackages', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setInsurancePackages(data.data); // Assuming the data structure includes an array of insurance packages
            } else {
                console.error('Failed to fetch insurance packages. Response:', response);
            }
        } catch (error) {
            console.error('Error during fetch:', error);
        }
    };

    return (
        <div>
            <label>Select Insurance Package:</label>
            <select>
                <option value="">Select an option</option>
                {insurancePackages.map((insurance, index) => (
                    <option key={index} value={insurance.id}>
                        {insurance.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default InsuranceProviders;
