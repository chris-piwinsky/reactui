import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Paginator } from 'primereact/paginator';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

interface TableRow {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  // Add more fields as needed
}

function HomePage(): JSX.Element {
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
        <Link to={`/user/${rowData.id}`} state={{ user: rowData }}>
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
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="text"
            placeholder="Filter by Name or Email"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </span>
        <span>
          <Paginator
            first={startIndex}
            rows={itemsPerPage}
            totalRecords={totalItems}
            onPageChange={onPageChange}
          />
        </span>
        <span>
          <Button
            icon="pi pi-refresh"
            className="p-button-text"
            onClick={handleResetSearch}
          />
        </span>
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
