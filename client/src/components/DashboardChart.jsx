import React from 'react';
import { Bar } from 'react-chartjs-2';

const OccupancyChart = ({ data }) => {
    // Extracting necessary data from the received data object for the chart
    const chartData = {
        labels: data.map((item) => `${item.movie} - ${item.location} - ${item.theater}`),
        datasets: [
            {
                label: 'Total Seats Sold',
                data: data.map((item) => item.totalSeatsSold),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    };

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Total Seats Sold'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Movies, Location, Theater'
                }
            }
        }
    };

    return (
        <div className="chart-container" style={{ height: '400px', width: '600px' }}>
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
};

export default OccupancyChart;
