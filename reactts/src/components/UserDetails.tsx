import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import AddressTable from './AddressTable';
import EmploymentTable from './EmploymentTable';
import LineChartComponent from './LineChart';
import PieChart from './Piechart';
import '../styles.css';

interface UserDetailsProps {
  user: {
    first_name: string;
    last_name: string;
    address: any; // Replace 'any' with the appropriate type for address
    employment: any; // Replace 'any' with the appropriate type for employment
  };
}

function UserDetails(props: UserDetailsProps): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'address' | 'employment'>('address');

  const handleTabClick = (tab: 'address' | 'employment') => {
    setActiveTab(tab);
  };

  return (
    <div className="user-details">
      <h2>{props.user.first_name} {props.user.last_name}</h2>
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
          <AddressTable address={props.user.address} />
          <div className="line-chart">
            <h3>Line Chart</h3>
            <LineChartComponent />
          </div>
        </div>
      )}
      {activeTab === 'employment' && (
        <div className="user-tab">
          <EmploymentTable employment={props.user.employment} />
          <PieChart />
        </div>
      )}
    </div>
  );
}

export default UserDetails;
