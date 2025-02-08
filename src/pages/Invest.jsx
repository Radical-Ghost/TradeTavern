import React, { useState } from "react";
import { BsArrowUpCircleFill, BsArrowDownCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "../css/Invest.css";

export default function Invest() {
  const [selectedStock, setSelectedStock] = useState(null);
  const [duration, setDuration] = useState("6 months");
  const navigate = useNavigate();

  const companies = [
    {
      id: 1,
      name: "Apple Inc.",
      symbol: "AAPL",
      open: 145.30,
      high: 149.00,
      close: 147.80,
      return: "5.2%",
      marketCap: "2.5T",
      peRatio: 29.7,
      dividendYield: "0.58%",
      sector: "Technology",
      isPositive: true,
      image: "https://via.placeholder.com/50?text=Apple",
    },
    {
      id: 2,
      name: "Tesla Inc.",
      symbol: "TSLA",
      open: 275.50,
      high: 282.00,
      close: 279.20,
      return: "-1.1%",
      marketCap: "826B",
      peRatio: 93.5,
      dividendYield: "None",
      sector: "Automotive",
      isPositive: false,
      image: "https://via.placeholder.com/50?text=Tesla",
    },
    {
      id: 3,
      name: "Amazon.com",
      symbol: "AMZN",
      open: 120.10,
      high: 124.00,
      close: 121.70,
      return: "3.0%",
      marketCap: "1.6T",
      peRatio: 61.2,
      dividendYield: "None",
      sector: "Consumer Goods",
      isPositive: true,
      image: "https://via.placeholder.com/50?text=Amazon",
    },
  ];

  const handleStockClick = (company) => {
    navigate(`/StocksDetail`);
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  const calculatePrediction = (company) => {
    let multiplier = 0;
    if (duration === "6 months") multiplier = 0.1;
    else if (duration === "1 year") multiplier = 0.2;
    else if (duration === "3 years") multiplier = 0.5;

    const predictedEarning = parseFloat(company.return) + multiplier * parseFloat(company.return);
    return predictedEarning.toFixed(2) + "%";
  };

  return (
    <div className="invest-page">
      <h1>Invest Page</h1>

      <div className="invest-header">
        <span>Company</span>
        <span>Open</span>
        <span>High</span>
        <span>Close</span>
        <span>Return</span>
        <span>Predicted Return(6 mos)</span>
      </div>

      <div className="invest-list">
        {companies.map((company) => (
          <div
            key={company.id}
            className="invest-row"
            onClick={() => handleStockClick(company)}
          >
            <div className="company-item">
              <img src={company.image} alt={company.name} className="company-logo" />
              <strong>{company.name}</strong> ({company.symbol})
            </div>
            <div className="data-point">{company.open}</div>
            <div className="data-point">{company.high}</div>
            <div className="data-point">{company.close}</div>
            <div className="data-point return">
              {company.isPositive ? (
                <BsArrowUpCircleFill className="icon-positive" />
              ) : (
                <BsArrowDownCircleFill className="icon-negative" />
              )}
              {company.return}
            </div>
            <div className="data-point predict">
              {company.id === selectedStock && (
                <>
                  <strong>Prediction:</strong> {calculatePrediction(company)}
                  <div>
                    <label htmlFor="duration">Select Duration: </label>
                    <select value={duration} onChange={handleDurationChange}>
                      <option value="6 months">6 Months</option>
                      <option value="1 year">1 Year</option>
                      <option value="3 years">3 Years</option>
                    </select>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
