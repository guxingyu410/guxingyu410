import React, { useState } from 'react';
import InspectionManagement from './InspectionManagement';
import RepairManagement from './RepairManagement';
import DeviceManagement from './DeviceManagement';
import Statistics from './Statistics';
import UserManagement from './UserManagement';

const Dashboard = () => {
  const [selectedFunction, setSelectedFunction] = useState('inspection');

  const renderContent = () => {
    switch (selectedFunction) {
      case 'inspection':
        return <InspectionManagement />;
      case 'repair':
        return <RepairManagement />;
      case 'device':
        return <DeviceManagement />;
      case 'statistics':
        return <Statistics />;
      case 'user':
        return <UserManagement />;
      default:
        return <InspectionManagement />;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <ul>
          <li onClick={() => setSelectedFunction('inspection')}>巡检管理</li>
          <li onClick={() => setSelectedFunction('repair')}>维修管理</li>
          <li onClick={() => setSelectedFunction('device')}>设备管理</li>
          <li onClick={() => setSelectedFunction('statistics')}>统计分析</li>
          <li onClick={() => setSelectedFunction('user')}>用户权限管理</li>
        </ul>
      </div>
      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
