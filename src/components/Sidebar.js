import React from 'react';
import { Menu } from 'primereact/menu';

function Sidebar() {
  const items = [
      {
          label: 'Home',
          icon: 'pi pi-home',
          to: '/',
      },
      {
          label: 'Dashboard',
          icon: 'pi pi-chart-bar',
          to: '/dashboard',
      },
      // Add more menu items as needed
  ];

  return (
      <div className="sidebar">
          <Menu model={items} />
      </div>
  );
}

export default Sidebar;

