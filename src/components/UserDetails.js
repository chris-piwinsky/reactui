import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from 'primereact/button';
import AddressTable from './AddressTable';
import EmploymentTable from './EmploymentTable';
import LineChartComponent from './LineChart';
import PieChart from './Piechart';
import '../styles.css';

function UserDetails() {
    const location = useLocation();
    const user = location.state.user;
    const [activeTab, setActiveTab] = useState('address'); // Set the default tab to 'address'

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="user-details">
            <h2>{user.first_name} {user.last_name}</h2>
            <div className="user-tabs">
                {/* Removed "User Details" tab/button */}
                <Button
                    label="Address"
                    className={activeTab === 'address' ? 'p-button-primary active' : 'p-button-secondary'}
                    onClick={() => handleTabClick('address')}
                />
                <Button
                    label="Employment"
                    className={activeTab === 'employment' ? 'p-button-primary active' : 'p-button-secondary'}
                    onClick={() => handleTabClick('employment')}
                />
            </div>
            {activeTab === 'address' && (
                <div className="user-tab">
                    <AddressTable address={user.address} />
                    <div className="line-chart">
                        <h3>Line Chart</h3>
                        <LineChartComponent />
                    </div>
                </div>
            )}
            {activeTab === 'employment' && (
                <div className="user-tab">
                    <EmploymentTable employment={user.employment} />
                    <PieChart /> 
                </div>
            )}
        </div>
    );
}

export default UserDetails;
