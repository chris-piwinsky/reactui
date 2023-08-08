import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


function HomePage() {
    const [tableData, setTableData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Fetch data from the API
        fetch('https://random-data-api.com/api/v2/users?size=22&iresponse_type=json')
            .then(response => response.json())
            .then(data => {
                setTableData(data);
                setFilteredData(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        // Filter data based on search term
        const filtered = tableData.filter(row =>
            row.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
    }, [searchTerm, tableData]);

    const columns = [
        {
            field: 'first_name',
            header: 'First Name',
            body: (rowData) => (
                <Link to={`/user/${rowData.id}`} state={{ user: rowData }}>
                    {rowData.first_name} {rowData.last_name}
                </Link>
            ),
        },
        { field: 'email', header: 'Email' },
        // Add more columns as needed
    ];

    return (
        <div className="main-content">
            <h2>Components</h2>
            <div className="search-bar">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText
                        type="text"
                        placeholder="Filter by Name or Email"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </span>
            </div>
            <DataTable value={filteredData}>
                {columns.map(column => (
                    <Column key={column.field} field={column.field} header={column.header} body={column.body} />
                ))}
            </DataTable>
        </div>
    );
}

export default HomePage;

