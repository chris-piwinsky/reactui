import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

interface AddressTableProps {
  address: {
    street_name: string;
    city: string;
    state: string;
    zip_code: string;
  };
}

function AddressTable({ address }: AddressTableProps): JSX.Element {
  const addressColumns = [
    { field: 'street_name', header: 'Street' },
    { field: 'city', header: 'City' },
    { field: 'state', header: 'State' },
    { field: 'zip_code', header: 'Zip' },
  ];

  return (
    <DataTable value={[address]}>
      {addressColumns.map(column => (
        <Column key={column.field} field={column.field} header={column.header} frozen />
      ))}
    </DataTable>
  );
}

export default AddressTable;
