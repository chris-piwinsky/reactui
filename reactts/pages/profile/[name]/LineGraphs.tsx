import React from 'react';
import { Chart } from 'primereact/chart';

interface LineGraphsProps {
  lineGraphsData: {
    labels: string[];
    statistics: { label: string; data: number[] }[];
  };
}

const LineGraphsTab = ({ lineGraphsData }: LineGraphsProps): JSX.Element => {
  return (
    <div className="line-graphs-container">
      <div className="p-grid">
        {lineGraphsData.statistics.map((statistic, index) => (
          <div key={index} className="p-col">
            <div className="line-graph">
              <h3>{statistic.label}</h3>
              <Chart
                type="line"
                data={{
                  labels: lineGraphsData.labels,
                  datasets: [
                    {
                      label: statistic.label,
                      data: statistic.data,
                      borderColor: '#007be5',
                      fill: false,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
                style={{ width: '100%' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LineGraphsTab;
