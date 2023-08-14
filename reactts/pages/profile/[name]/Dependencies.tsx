import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

interface Address {
  id: number;
  street_name: string;
  city: string;
  state: string;
  zip_code: string;
}

const AddressTable = (): JSX.Element => {
  const [addressData, setAddressData] = useState([] as Address[]);

  useEffect(() => {
    fetch('https://random-data-api.com/api/v2/addresses?size=2&response_type=json')
      .then(response => response.json())
      .then(data => {
        setAddressData(data);
      })
      .catch(error => {
        console.error('Error fetching address data:', error);
      });
  }, []);

  const addressColumns = [
    { field: 'street_name', header: 'Name' },
    { field: 'city', header: 'City' },
  ];

  return (
    <div className="address-table-container">
      <div className="table-column">
        <DataTable value={addressData}>
          {addressColumns.map(column => (
            <Column key={column.field} field={column.field} header={column.header} />
          ))}
        </DataTable>
      </div>
      <div className="table-column">
        <DataTable value={addressData}>
          {addressColumns.map(column => (
            <Column key={column.field} field={column.field} header={column.header} />
          ))}
        </DataTable>
      </div>
    </div>
  );
}

export default AddressTable;
