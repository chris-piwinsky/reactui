// src/components/AddressTable.js
import React from 'react';

function AddressTable({ address }) {
  return (
    <table className="address-table">
      <tbody>
        <tr>
          <td>Street:</td>
          <td>{address.street_name}</td>
        </tr>
        <tr>
          <td>City:</td>
          <td>{address.city}</td>
        </tr>
        <tr>
          <td>State:</td>
          <td>{address.state}</td>
        </tr>
        <tr>
          <td>Zip:</td>
          <td>{address.zip_code}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default AddressTable;
