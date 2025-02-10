

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../css/StockDetail.css"; // Import CSS file

function StockDetail() {
  // Sample stock price data for the graph
  const stockData = [
    { time: "09:00", price: 440 },
    { time: "10:00", price: 432 },
    { time: "11:00", price: 435 },
    { time: "12:00", price: 430 },
    { time: "13:00", price: 428 },
    { time: "14:00", price: 426 },
    { time: "15:00", price: 430.85 },
  ];

  // Dummy stock details
  const stockInfo = {
    name: "ITC Ltd.",
    sector: "Diversified",
    industry: "Diversified",
    price: 430.85,
    change: -10.25,
    changePercent: -2.32,
    dayLow: 428.40,
    dayHigh: 445.50,
    weekLow: 399.35,
    weekHigh: 528.50,
    volume: "18,875,982",
    lastUpdated: "7 Feb, 2025 | 15:59",
    marketCap: "₹5.2T",
    peRatio: 25.6,
    eps: 17.85,
    dividendYield: "2.5%",
    revenue: "₹65,200 Cr",
    netProfit: "₹15,450 Cr",
    roe: "20.1%",
    roce: "18.5%",
  };

  // Dummy news data related to the stock
  const stockNews = [
    {
      title: "ITC Ltd. Reports Strong Q3 Earnings Amid Diversified Growth",
      date: "Feb 7, 2025",
      link: "#",
    },
    {
      title: "ITC Expands FMCG Market Share, Analysts Predict Bullish Growth",
      date: "Feb 5, 2025",
      link: "#",
    },
    {
      title: "ITC's Hotel Segment Sees Record Growth, Boosting Overall Revenue",
      date: "Feb 3, 2025",
      link: "#",
    },
  ];

  return (
    <div className="stock-container">
      {/* Header with underline */}
      <h1 className="stock-title">{stockInfo.name}</h1>
      <h2 className="stock-footer">Sector : Diversified | Inwdustry : Diversified</h2> 
      <button type="button" class="btn btn-success">Invest</button>

      <hr className="stock-line" />

      <div className="stock-main">
        {/* Price & Change */}
        <div className="stock-price-section">
          <h2 className="stock-price">₹{stockInfo.price.toFixed(2)}</h2>
          <p className={`price-change ${stockInfo.change < 0 ? "negative" : "positive"}`}>
            {stockInfo.change} ({stockInfo.changePercent}%)
          </p>
          <p className="last-updated">As on {stockInfo.lastUpdated}</p>
        </div>

        {/* Graph on the right */}
        <div className="stock-chart">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={stockData}>
              <XAxis dataKey="time" />
              <YAxis domain={["dataMin - 5", "dataMax + 5"]} />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#d9534f" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stock Info Below */}
      <div className="stock-info">
        <div className="range-box">
          <p>Day Range</p>
          <div className="range">
            <span>{stockInfo.dayLow}</span>
            <div className="progress">
              <div
                className="progress-bar"
                style={{
                  width: `${((stockInfo.price - stockInfo.dayLow) / (stockInfo.dayHigh - stockInfo.dayLow)) * 100}%`,
                }}
              ></div>
            </div>
            <span>{stockInfo.dayHigh}</span>
          </div>
        </div>

        <div className="range-box">
          <p>52 Week Range</p>
          <div className="range">
            <span>{stockInfo.weekLow}</span>
            <div className="progress">
              <div
                className="progress-bar"
                style={{
                  width: `${((stockInfo.price - stockInfo.weekLow) / (stockInfo.weekHigh - stockInfo.weekLow)) * 100}%`,
                }}
              ></div>
            </div>
            <span>{stockInfo.weekHigh}</span>
          </div>
        </div>

        <div className="volume-box">
          <p>Volume</p>
          <h3>{stockInfo.volume}</h3>
        </div>
      </div>
      <div className="stock-fundamentals">
        <h2>Stocks Details</h2>
        <div className="fundamentals-grid">
          <div><strong>open</strong> {stockInfo.marketCap}</div>
          <div><strong>close</strong> {stockInfo.peRatio}</div>
          <div><strong>high</strong> {stockInfo.eps}</div>
          <div><strong>Dividend Yield:</strong> {stockInfo.dividendYield}</div>
          <div><strong>Revenue:</strong> {stockInfo.revenue}</div>
          <div><strong>Net Profit:</strong> {stockInfo.netProfit}</div>
          <div><strong>ROE:</strong> {stockInfo.roe}</div>
          <div><strong>ROCE:</strong> {stockInfo.roce}</div>
        </div>
      </div>
                

      {/* Stock Fundamentals */}
      <div className="stock-fundamentals">
        <h2>Stock Fundamentals</h2>
        <div className="fundamentals-grid">
          <div><strong>Market Cap:</strong> {stockInfo.marketCap}</div>
          <div><strong>P/E Ratio:</strong> {stockInfo.peRatio}</div>
          <div><strong>EPS:</strong> {stockInfo.eps}</div>
          <div><strong>Dividend Yield:</strong> {stockInfo.dividendYield}</div>
          <div><strong>Revenue:</strong> {stockInfo.revenue}</div>
          <div><strong>Net Profit:</strong> {stockInfo.netProfit}</div>
          <div><strong>ROE:</strong> {stockInfo.roe}</div>
          <div><strong>ROCE:</strong> {stockInfo.roce}</div>
        </div>
      </div>

      <div className="detailStock">
                <h1>Detailed Chart:</h1>
      </div>
                
      {/* Stock News */}
      <div className="stock-news">
        <h2>Latest News on {stockInfo.name}</h2>
        <ul>
          {stockNews.map((news, index) => (
            <li key={index}>
              <a href={news.link} target="_blank" rel="noopener noreferrer">{news.title}</a>
              <span className="news-date"> ({news.date})</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default StockDetail;
