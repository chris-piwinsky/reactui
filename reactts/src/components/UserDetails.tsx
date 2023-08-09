import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import AddressTable from './AddressTable';
import EmploymentTable from './EmploymentTable';
import LineChartComponent from './LineChart';
import PieChart from './Piechart';
import '../styles.css';
import { useSelectedUser } from './SelectedUserContext'; // Import the context hook

function UserDetails(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const { selectedUser } = useSelectedUser(); // Get the selected user data from context
  const [activeTab, setActiveTab] = useState<'address' | 'employment'>('address');
  const [userDetails, setUserDetails] = useState<any>(null);

  const handleTabClick = (tab: 'address' | 'employment') => {
    setActiveTab(tab);
  };

  useEffect(() => {
    // Fetch additional user details based on the selectedUser ID
    if (selectedUser) {
      fetch(`https://api.example.com/users/${selectedUser.id}`)
        .then(response => response.json())
        .then(data => {
          setUserDetails(data);
        })
        .catch(error => console.error('Error fetching user details:', error));
    }
  }, [selectedUser]);

  if (!selectedUser) {
    return <div>No user selected.</div>;
  }

  return (
    <div className="user-details">
      <h2>{selectedUser.first_name} {selectedUser.last_name}</h2>
      <div className="user-tabs">
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
          <AddressTable address={userDetails?.address || selectedUser.address} />
          <div className="line-chart">
            <h3>Line Chart</h3>
            <LineChartComponent />
          </div>
        </div>
      )}
      {activeTab === 'employment' && (
        <div className="user-tab">
          <EmploymentTable employment={userDetails?.employment || selectedUser.employment} />
          <PieChart />
        </div>
      )}
    </div>
  );
}

export default UserDetails;
