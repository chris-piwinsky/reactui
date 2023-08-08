// src/components/AddressTable.js
import React from 'react';

function DetailsTable({ details }) {
  return (
    <table className="address-table">
      <tbody>
        <tr>
          <td>First Name:</td>
          <td>{details.first_name}</td>
        </tr>
        <tr>
          <td>Last Name:</td>
          <td>{details.last_name}</td>
        </tr>
        <tr>
          <td>Username:</td>
          <td>{details.username}</td>
        </tr>
        <tr>
          <td>DOB:</td>
          <td>{details.date_of_birth}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default DetailsTable;
