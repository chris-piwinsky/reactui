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

const DocumentationPanel = (): JSX.Element => {
  const [addressData1, setAddressData1] = useState([] as Address[]);
  const [addressData2, setAddressData2] = useState([] as Address[]);
  
  useEffect(() => {
    fetch('https://random-data-api.com/api/v2/addresses?size=2&response_type=json')
      .then(response => response.json())
      .then(data => {
        setAddressData1(data);
      })
      .catch(error => {
        console.error('Error fetching address data:', error);
      });

    fetch('https://random-data-api.com/api/v2/addresses?size=2&response_type=json')
      .then(response => response.json())
      .then(data => {
        setAddressData2(data);
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
      <table>
        <thead>
          <tr>
            <th colSpan={2}>Dependencies</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <DataTable value={addressData1}>
                {addressColumns.map(column => (
                  <Column key={column.field} field={column.field} header={column.header} />
                ))}
              </DataTable>
            </td>
            <td>
              <DataTable value={addressData2}>
                {addressColumns.map(column => (
                  <Column key={column.field} field={column.field} header={column.header} />
                ))}
              </DataTable>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default DocumentationPanel;
