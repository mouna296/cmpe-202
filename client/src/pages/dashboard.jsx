import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const DashboardAnalytics = () => {
    const [chartData, setChartData] = useState({});
    const [period, setPeriod] = useState(30); // Default period

    const fetchData = async () => {
        try {
            const response = await axios.get(`/dashboard/occupancy?period=${period}`);
            const data = response.data.data;

            // Process data for chart
            const locations = {};
            data.forEach(entry => {
                const key = `${entry.location}-${entry.movie}`;
                if (!locations[key]) {
                    locations[key] = {
                        label: `${entry.location}-${entry.movie}`,
                        data: [],
                    };
                }
                locations[key].data.push(entry.totalSeatsSold);
            });

            const chartData = {
                labels: Array.from({ length: period }, (_, i) => i + 1), // Labels for x-axis (days)
                datasets: Object.values(locations).map(location => ({
                    label: location.label,
                    data: location.data,
                    fill: false,
                    borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16), // Random color for each line
                })),
            };

            setChartData(chartData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [period]);

    const handlePeriodChange = event => {
        setPeriod(event.target.value);
    };

    return (
        <div>
            <h1>Dashboard Analytics</h1>
            <label htmlFor="period">Select Period:</label>
            <select id="period" value={period} onChange={handlePeriodChange}>
                <option value={30}>30 days</option>
                <option value={60}>60 days</option>
                <option value={90}>90 days</option>
            </select>

            <Line data={chartData} />
        </div>
    );
};

export default DashboardAnalytics;