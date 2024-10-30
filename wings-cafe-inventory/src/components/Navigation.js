// src/components/Navigation.js
import React from 'react';

const Navigation = ({ activeTab, setActiveTab }) => {
  return (
    <nav>
      <ul>
        <button onClick={() => setActiveTab('products')}>
          <a href="#">Product Management</a>
        </button>
        <button onClick={() => setActiveTab('users')}>
          <a href="#">User Management</a>
        </button>
      </ul>
    </nav>
  );
};

export default Navigation;
