import React, { useState } from 'react';
import Navigation from './Navigation';
import ProductManagement from './ProductManagement';
import UserManagement from './UserManagement';

const Dashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('products');

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserManagement />;
      case 'products':
      default:
        return <ProductManagement />;
    }
  };

  return (
    <div className='container'>
      <header>
        <img src="logo.jpg" alt="logo.jpg" />
        {/* Logout button to trigger onLogout function passed from App.js */}
        <button onClick={onLogout} id ='logout'>Logout</button>
      </header>
      
      {/* Navigation component that lets users switch between tabs */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Render content based on the active tab */}
      {renderContent()}
    </div>
  );
};

export default Dashboard;
