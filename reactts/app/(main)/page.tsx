/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Paginator } from 'primereact/paginator';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { TableRow } from './pages/types';

const HomePage = (): JSX.Element => {
    const [tableData, setTableData] = useState<TableRow[]>([]);
    const [filteredData, setFilteredData] = useState<TableRow[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        // Fetch data from the API
        fetch('https://random-data-api.com/api/v2/users?size=22&iresponse_type=json')
            .then(response => response.json())
            .then((data: TableRow[]) => {
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
            body: (rowData: TableRow) => (
                // Inside your HomePage component
                <Link href={`/profile/${rowData.first_name}-${rowData.last_name}`}>
                    {rowData.first_name} {rowData.last_name}
                </Link>

            ),
        },
        { field: 'last_name', header: 'Last Name' },
        { field: 'email', header: 'Email' },
        // Add more columns as needed
    ];

    const totalItems = filteredData.length;

    const onPageChange = (event: { page: number }) => {
        setCurrentPage(event.page + 1);
    };

    const handleResetSearch = () => {
        setSearchTerm('');
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedData = filteredData.slice(startIndex, endIndex);

    return (
        <div className="main-content">
            <h2>Components</h2>
            <div className="search-bar">
                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-search" />
                    </span>
                    <InputText
                        type="text"
                        placeholder="Filter by Name or Email"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <Button
                        icon="pi pi-refresh"
                        className="p-button-text"
                        onClick={handleResetSearch}
                    />
                </div>
                <Paginator
                    first={startIndex}
                    rows={itemsPerPage}
                    totalRecords={totalItems}
                    onPageChange={onPageChange}
                    className="custom-paginator"
                />
            </div>

            <DataTable value={displayedData}>
                {columns.map(column => (
                    <Column
                        key={column.field}
                        field={column.field}
                        header={column.header}
                        body={column.body}
                    />
                ))}
            </DataTable>
        </div>
    );
}

export default HomePage;