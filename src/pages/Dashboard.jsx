// Dashboard.jsx
import React, { useState } from 'react';
import '../css/Dashboard.css';

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState('stocks');

  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    joinedDate: 'Member since Jan 2023',
    kycStatus: 'Verified',
  };

  const portfolioData = {
    totalValue: '₹1,23,456',
    investedAmount: '₹1,00,000',
    totalReturns: '₹23,456',
    returnsPercentage: '+23.45%',
    todayChange: '+₹1,234 (1.2%)',
    investments: [
      { name: 'HDFC Bank', value: '₹25,000', change: '+2.5%' },
      { name: 'Reliance', value: '₹30,000', change: '-1.2%' },
      { name: 'TCS', value: '₹28,000', change: '+0.8%' }
    ]
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="nav-links">
          <button className="nav-button">Explore</button>
          <button className="nav-button">Investments</button>
          <button className="nav-button">Profile</button>
        </div>
      </nav>

      <main className="dashboard-main">
        <div className="portfolio-summary">
          <div className="summary-card">
            <div className="personal-info">
              <div className="user-details">
                <h3>{userData.name}</h3>
                <p>{userData.email}</p>
                <span className="member-status">{userData.joinedDate}</span>
                <span className="kyc-badge">{userData.kycStatus}</span>
              </div>
            </div>
            <div className="investment-summary">
              <div className="summary-row">
                <div className="summary-item">
                  <label>Current Value</label>
                  <div className="value primary">{portfolioData.totalValue}</div>
                  <div className="change">{portfolioData.todayChange}</div>
                </div>
                <div className="summary-item">
                  <label>Invested Amount</label>
                  <div className="value">{portfolioData.investedAmount}</div>
                </div>
                <div className="summary-item">
                  <label>Total Returns</label>
                  <div className="value">{portfolioData.totalReturns}</div>
                  <div className="returns">{portfolioData.returnsPercentage}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="investment-tabs">
          <button 
            className={`tab ${selectedTab === 'stocks' ? 'active' : ''}`}
            onClick={() => setSelectedTab('stocks')}
          >
            Stocks
          </button>
          <button 
            className={`tab ${selectedTab === 'mutual-funds' ? 'active' : ''}`}
            onClick={() => setSelectedTab('mutual-funds')}
          >
            Mutual Funds
          </button>
          <button 
            className={`tab ${selectedTab === 'fixed-deposit' ? 'active' : ''}`}
            onClick={() => setSelectedTab('fixed-deposit')}
          >
            Fixed Deposit
          </button>
        </div>

        <div className="investments-list">
          {portfolioData.investments.map((investment, index) => (
            <div key={index} className="investment-card">
              <div className="investment-name">{investment.name}</div>
              <div className="investment-value">{investment.value}</div>
              <div className={`investment-change ${
                investment.change.startsWith('+') ? 'positive' : 'negative'
              }`}>
                {investment.change}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;