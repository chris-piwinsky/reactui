import React from 'react';
import { Chart } from 'primereact/chart';

function LineChartComponent() {
    const chartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Sample Chart Data',
                data: [65, 59, 80, 81, 56, 55, 40],
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div className="line-chart">
            <Chart type="line" data={chartData} options={chartOptions} />
        </div>
    );
}

export default LineChartComponent;
