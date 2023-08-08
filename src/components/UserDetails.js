import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import AddressTable from './AddressTable';
import LineChartComponent from './LineChart';
import '../styles.css';

function UserDetails() {
    const location = useLocation();
    const user = location.state.user;
    const [activeTab, setActiveTab] = useState('address'); // Set the default tab to 'address'
    const [selectedChart, setSelectedChart] = useState('Line Chart 1');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const chartSelectOptions = [
        { label: 'Line Chart 1', value: 'Line Chart 1' },
        { label: 'Line Chart 2', value: 'Line Chart 2' },
    ];

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
                    label="Occupation"
                    className={activeTab === 'occupation' ? 'p-button-primary active' : 'p-button-secondary'}
                    onClick={() => handleTabClick('occupation')}
                />
            </div>
            {/* Removed "User Details" tab/content */}
            {activeTab === 'address' && (
                <div className="user-tab">
                    <AddressTable address={user.address} />
                </div>
            )}
            {activeTab === 'occupation' && (
                <div className="user-tab">
                    {/* Add occupation content */}
                </div>
            )}
            <div className="user-charts">
                <h2>User Charts</h2>
                <Dropdown value={selectedChart} options={chartSelectOptions} onChange={(e) => setSelectedChart(e.value)} />
                <LineChartComponent /> {/* Use the LineChartComponent */}
            </div>
        </div>
    );
}

export default UserDetails;
