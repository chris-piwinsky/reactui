import React, { useState } from 'react';
import { useRouter } from 'next/router';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { TabView, TabPanel } from 'primereact/tabview';
import CodePanel from './Code';
import OverviewTable from './OverviewTable';
import LineGraphsTab from './Monitor';
import MonitorPanel from './Monitor';
import DocumentationPanel from './Documentation';
import InsightsPanel from './Insights';
import DependenciesPanel from './Dependencies';
import ScansPanel from './SecurityScans';

const ProfilePage = (): JSX.Element => {
  const router = useRouter();
  const { name } = router.query;

  // Check if name exists and split it into first_name and last_name
  const [firstName, lastName] = name?.toString().split('-') || ['', ''];

  const [activeTab, setActiveTab] = useState(0);

  // Sample overview data
  const overviewData = {
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquam quam in ex bibendum congue. Suspendisse et interdum justo.',
    organization: 'Acme Corporation',
    lastModified: '2023-08-15',
    owner: 'John Doe',
  };

  // Sample graph data
  const lineGraphsData = {
    labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00'],
    statistics: [
      { label: 'Traffic', data: [120, 250, 180, 320, 150, 200, 300] },
      { label: 'Errors', data: [8, 3, 5, 2, 6, 4, 7] },
      { label: 'Latency', data: [40, 60, 45, 55, 50, 65, 75] },
    ],
  };
  
  const tabs = [
    { label: 'Code', icon: 'pi pi-fw pi-map', content: <CodePanel /> },
    { label: 'Security Scans', icon: 'pi pi-fw pi-map', content: <ScansPanel /> },
    { label: 'Monitor', icon: 'pi pi-fw pi-chart-line', content: <MonitorPanel lineGraphsData={lineGraphsData} /> },
    { label: 'Dependencies', icon: 'pi pi-fw pi-share-alt', content: <DependenciesPanel /> },
    { label: 'Insights', icon: 'pi pi-fw pi-map', content: <InsightsPanel /> },
    { label: 'Documentation', icon: 'pi pi-fw pi-map', content: <DocumentationPanel /> },
    // Add more tabs as needed
  ];

  return (
    <div>
      <h2>Profile Page</h2>
      <p>First Name: {firstName}</p>
      <p>Last Name: {lastName}</p>

      {/* Use the OverviewTable component */}
      <OverviewTable overviewData={overviewData} />

      <TabView activeIndex={activeTab} onTabChange={(e) => setActiveTab(e.index)}>
        {tabs.map((tab, index) => (
          <TabPanel key={index} header={tab.label}>
            {tab.content}
          </TabPanel>
        ))}
      </TabView>
    </div>
  );
};

export default ProfilePage;
