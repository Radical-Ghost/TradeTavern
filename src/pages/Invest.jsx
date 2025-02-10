import React, { useState } from "react";
import { BsArrowUpCircleFill, BsArrowDownCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "../css/Invest.css"; 

export default function Invest() {
  const [selectedStock, setSelectedStock] = useState(null);
  const [duration, setDuration] = useState("6 months");
  const navigate = useNavigate();

  
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const companies = [
    {
      id: 1,
      name: "Apple Inc.",
      symbol: "AAPL",
      open: 145.3,
      high: 149.0,
      close: 147.8,
      return: "5.2%",
      marketCap: "2.5T",
      peRatio: 29.7,
      isPositive: true,
      image: "https://imgs.search.brave.com/vyLq2KO_q8qXRgKudWdPGolzlS8WN9APY19wc7UiHOo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9mL2ZhL0Fw/cGxlX2xvZ29fYmxh/Y2suc3ZnLzIyMHB4/LUFwcGxlX2xvZ29f/YmxhY2suc3ZnLnBu/Zw",
    },
    {
      id: 2,
      name: "Tesla Inc.",
      symbol: "TSLA",
      open: 275.5,
      high: 282.0,
      close: 279.2,
      return: "-1.1%",
      marketCap: "826B",
      peRatio: 93.5,
      isPositive: false,
      image: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png",
    },
    {
      id: 3,
      name: "Amazon.com",
      symbol: "AMZN",
      open: 120.1,
      high: 124.0,
      close: 121.7,
      return: "3.0%",
      marketCap: "1.6T",
      peRatio: 61.2,
      isPositive: true,
      image: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    },
    {
      id: 4,
      name: "Google LLC",
      symbol: "GOOGL",
      open: 135.7,
      high: 140.2,
      close: 138.5,
      return: "2.5%",
      marketCap: "1.8T",
      peRatio: 33.8,
      isPositive: true,
      image: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    },
    {
      id: 5,
      name: "Microsoft Corp.",
      symbol: "MSFT",
      open: 310.5,
      high: 320.1,
      close: 315.8,
      return: "4.0%",
      marketCap: "2.3T",
      peRatio: 40.1,
      isPositive: true,
      image: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    },
  ];

  const handleStockClick = (company) => {
    navigate(`/StocksDetail`);
  };

  const calculatePrediction = (company) => {
    let multiplier = duration === "6 months" ? 0.1 : duration === "1 year" ? 0.2 : 0.5;
    const predictedEarning = parseFloat(company.return) + multiplier * parseFloat(company.return);
    return predictedEarning.toFixed(2) + "%";
  };

  return (
    <div className="invest-page">
      <h1 className="invest-title">Invest Page</h1>

      <div className="invest-grid">
        {companies.map((company) => (
          <div
            key={company.id}
            className="invest-card"
            onClick={() => handleStockClick(company)}
          >
            <div className="invest-header">
              <img src={company.image} alt={company.name} className="company-logo" />
              <div>
                <h2 className="company-name">{company.name} ({company.symbol})</h2>
                <p className="market-cap">{company.marketCap} Market Cap</p>
              </div>
            </div>

            <p className="stock-date">{currentDate}</p> {/* Display Current Date in Card */}

            <div className="invest-info">
              <p><strong>Open:</strong> ${company.open}</p>
              <p><strong>High:</strong> ${company.high}</p>
              <p><strong>Close:</strong> ${company.close}</p>
              <p className={`return ${company.isPositive ? "positive" : "negative"}`}>
                {company.isPositive ? <BsArrowUpCircleFill className="icon" /> : <BsArrowDownCircleFill className="icon" />}
                {company.return}
              </p>
            </div>

            {selectedStock === company.id && (
              <div className="prediction-box">
                <p><strong>Predicted Return:</strong> {calculatePrediction(company)}</p>
                <label htmlFor="duration">Select Duration:</label>
                <select
                  id="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="duration-select"
                >
                  <option value="6 months">6 Months</option>
                  <option value="1 year">1 Year</option>
                  <option value="3 years">3 Years</option>
                </select>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
