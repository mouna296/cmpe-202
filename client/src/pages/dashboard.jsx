import React from 'react';
import axios from 'axios';
import DashboardChart from '../components/DashboardChart';

const DashboardPage = () => {
  return (
    <div>
      <h1>Occupancy Dashboard</h1>
      <DashboardChart />
    </div>
  );
};

export default DashboardPage;