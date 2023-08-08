import { Chart } from 'primereact/chart';

function PieChart() {
    const chartData = {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
            {
                data: [300, 50, 100],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
            }
        ]
    };

    return (
        <div className="pie-chart-container">
            <h3>Pie Chart</h3>
            <Chart type="pie" data={chartData} />
        </div>
    );
}

export default PieChart;
