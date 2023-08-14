import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

interface OverviewTableProps {
  overviewData: {
    description: string;
    organization: string;
    lastModified: string;
    owner: string;
  };
}

const OverviewTable: React.FC<OverviewTableProps> = ({ overviewData }) => {
  return (
    <div className="p-card p-p-3 p-mb-4" style={{ border: '1px solid #ddd' }}>
      <h3 className="p-text-uppercase p-text-bold p-mb-2" style={{ fontSize: '1.2rem' }}>
        Overview
      </h3>
      <DataTable value={[overviewData]} className="p-datatable-striped">
        <Column field="description" header="Description" />
        <Column field="organization" header="Organization" />
        <Column field="lastModified" header="Last Modified" />
        <Column field="owner" header="Owner" />
      </DataTable>
    </div>
  );
};

export default OverviewTable;
