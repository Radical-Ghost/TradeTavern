import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StockGraph = () => {
  // Sample stock data (replace with real stock data from API)
  const stockData = [
    { date: '2024-09-20', price: 150 },
    { date: '2024-09-21', price: 160 },
    { date: '2024-09-22', price: 155 },
    { date: '2024-09-23', price: 170 },
    { date: '2024-09-24', price: 165 },
    { date: '2024-09-25', price: 175 },
    { date: '2024-09-26', price: 180 }
  ];

  return (
    <div className="bg-light p-3" style={{ marginLeft: '30px', borderRadius: '15px', marginTop: '24px', width:'850px'}}>
      <h3 className="text-center">Stock Price Over Time</h3>
      <ResponsiveContainer width="100%" height={470}>
        <LineChart data={stockData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockGraph;
