import {MagnifyingGlassIcon} from '@heroicons/react/24/solid'

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const DashboardChart = () => {
  const [occupancyData, setOccupancyData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get('/dashboard/occupancy'); // Replace with your actual endpoint
      setOccupancyData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Transform occupancyData to the format required by Chart.js
  const chartData = {
    labels: occupancyData.map((data) => data.movie),
    datasets: [
      {
        label: 'Occupancy',
        data: occupancyData.map((data) => data.occupancy),
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };
  // Dummy data for the chart (replace with your actual data)
		// const data = {
		//   labels: ['January', 'February', 'March', 'April', 'May'],
		//   datasets: [
		// 	{
		// 	  label: 'Sales for 2021 (in $)',
		// 	  backgroundColor: 'rgba(75, 192, 192, 0.2)',
		// 	  borderColor: 'rgba(75, 192, 192, 1)',
		// 	  borderWidth: 1,
		// 	  hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)',
		// 	  hoverBorderColor: 'rgba(75, 192, 192, 1)',
		// 	  data: [500, 800, 1100, 600, 1200], // Replace with your actual data values
		// 	},
		//   ],
		// }; 

		// const options = {
		// 	scales: {
		// 	  yAxes: [
		// 		{
		// 		  ticks: {
		// 			beginAtZero: true,
		// 		  },
		// 		},
		// 	  ],
		// 	},
		//   };
  const options = {
			scales: {
			  yAxes: [
				{
				  ticks: {
					beginAtZero: true,
				  },
				},
			  ],
			},
		  };



  return <Line data={chartData} />;
};

export default DashboardChart;