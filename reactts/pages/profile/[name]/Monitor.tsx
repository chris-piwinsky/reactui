import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

interface Population {
  data: {
    Year: string;
    Population: number;
  }[];
}

const MonitorPanel = (): JSX.Element => {
  const [populationData, setPopulationData] = useState<Population | null>(null);

  useEffect(() => {
    fetch('https://datausa.io/api/data?drilldowns=Nation&measures=Population')
      .then(response => response.json())
      .then(data => {
        setPopulationData(data);
      })
      .catch(error => {
        console.error('Error fetching population data:', error);
      });
  }, []);

  if (!populationData) {
    return <div>Loading...</div>;
  }

  const labels = populationData.data.map(entry => entry.Year).reverse(); // Reverse the order
  const population = populationData.data.map(entry => entry.Population).reverse(); // Reverse the order

  const lineChartData = {
    labels: labels,
    datasets: [
      {
        label: 'Population',
        data: population,
        borderColor: '#007be5',
        fill: false,
      },
    ],
  };

  return (
    <div className="line-graphs-container">
      <div className="p-grid">
        <div className="p-col">
          <div className="line-graph">
            <h3>Population Over Years</h3>
            <Chart
              type="line"
              data={lineChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
              style={{ width: '30%' }}
            />
            <Chart
              type="line"
              data={lineChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
              style={{ width: '30%' }}
            />
            <Chart
              type="line"
              data={lineChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
              style={{ width: '30%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitorPanel;
