import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

function EmploymentTable({ employment }) {
    const addressColumns = [
        { field: 'title', header: 'Title' },
        { field: 'key_skill', header: 'Skill' }
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
