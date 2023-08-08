import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

interface EmploymentTableProps {
  employment: {
    title: string;
    key_skill: string;
  };
}

function EmploymentTable({ employment }: EmploymentTableProps): JSX.Element {
  const addressColumns = [
    { field: 'title', header: 'Title' },
    { field: 'key_skill', header: 'Skill' },
  ];

  return (
    <DataTable value={[employment]}>
      {addressColumns.map(column => (
        <Column key={column.field} field={column.field} header={column.header} frozen />
      ))}
    </DataTable>
  );
}

export default EmploymentTable;
