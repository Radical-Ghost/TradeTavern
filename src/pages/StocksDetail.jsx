import React from "react";
import { useParams } from "react-router-dom";
import { Chart } from "react-chartjs-2";
import "chart.js/auto";
import "../css/StockDetail.css";

// Dummy stock data
const appleStock = {
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
  image: "https://via.placeholder.com/150?text=Apple",
  historicalData: {
    day: [359.38, 357.45, 359.00, 361.23, 362.80, 365.10],
    month: [340, 342, 345, 350, 355, 360],
    year: [280, 290, 300, 310, 320, 330, 340, 350],
  },
  news: [
    {
      title: "Apple Inc. Unveils New iPhone 13",
      description: "Apple has launched the iPhone 13 with significant improvements in camera and battery life.",
      date: "2024-09-20",
    },
    {
      title: "Apple's Q3 Earnings Report Surpasses Expectations",
      description: "Apple’s revenue for Q3 exceeded analysts' expectations, driven by strong sales of iPhones and services.",
      date: "2024-09-15",
    },
    {
      title: "Apple Inc. Joins ESG Initiative",
      description: "Apple has joined the ESG initiative to improve sustainability and corporate responsibility.",
      date: "2024-09-10",
    },
  ],
};

export default function StockDetail() {
  const { id } = useParams();
  const stock = appleStock; // Only Apple Stock

  const [selectedTimeFrame, setSelectedTimeFrame] = React.useState("day");
  const [predictedPrice, setPredictedPrice] = React.useState("$0");
  const [predictionDuration, setPredictionDuration] = React.useState(1);

  const handleTimeFrameChange = (e) => {
    setSelectedTimeFrame(e.target.value);
  };

  const handlePredictionDurationChange = (e) => {
    setPredictionDuration(e.target.value);
  };

  const handlePrediction = (e) => {
    e.preventDefault();
    const predictionData = selectedTimeFrame === "month" ? "Month" : "Year";
    const pricePrediction = Math.random() * 20 + 300; // Dummy prediction logic
    setPredictedPrice(`$${pricePrediction.toFixed(2)}`);
  };

  const data = {
    labels: stock.historicalData[selectedTimeFrame].map(
      (_, idx) => idx + 1
    ),
    datasets: [
      {
        label: `${stock.name} Stock Price`,
        data: stock.historicalData[selectedTimeFrame],
        fill: false,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(75,192,192,1)",
        tension: 0.4,
        pointBackgroundColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return (
    <div className="stock-detail-page">
      {/* Graph Section */}
      <div className="chart-container">
        <Chart type="line" data={data} />
      </div>

      {/* Stock Information Section */}
      <div className="stock-info-section">
        <div className="stock-info">
          <p>
            <strong>Open:</strong> {stock.open}
          </p>
          <p>
            <strong>High:</strong> {stock.high}
          </p>
          <p>
            <strong>Close:</strong> {stock.close}
          </p>
          <p>
            <strong>Return:</strong> {stock.return}
          </p>
          <p>
            <strong>Market Cap:</strong> {stock.marketCap}
          </p>
          <p>
            <strong>PE Ratio:</strong> {stock.peRatio}
          </p>
          <p>
            <strong>Dividend Yield:</strong> {stock.dividendYield}
          </p>
          <p>
            <strong>Sector:</strong> {stock.sector}
          </p>
        </div>
      </div>

      {/* Time Frame Selector */}
      <div className="time-frame-selector">
        <label htmlFor="time-frame">Select Time Frame: </label>
        <input
          type="radio"
          id="day"
          name="time-frame"
          value="day"
          checked={selectedTimeFrame === "day"}
          onChange={handleTimeFrameChange}
        />
        <label htmlFor="day">Day</label>

        <input
          type="radio"
          id="month"
          name="time-frame"
          value="month"
          checked={selectedTimeFrame === "month"}
          onChange={handleTimeFrameChange}
        />
        <label htmlFor="month">Month</label>

        <input
          type="radio"
          id="year"
          name="time-frame"
          value="year"
          checked={selectedTimeFrame === "year"}
          onChange={handleTimeFrameChange}
        />
        <label htmlFor="year">Year</label>
      </div>

      {/* Prediction Input Section */}
      <div className="prediction-section">
        <form onSubmit={handlePrediction}>
          <label htmlFor="prediction-duration">
            Enter Duration (months/years):
          </label>
          <input
            type="number"
            id="prediction-duration"
            value={predictionDuration}
            onChange={handlePredictionDurationChange}
            min="1"
            max="12"
            placeholder="Enter months or years"
          />
          <button type="submit">Predict Price</button>
        </form>
        <p>Predicted Share Price: {predictedPrice}</p>
      </div>

      {/* Purchase Stock Option */}
      <div className="purchase-stock">
        <h3>Purchase {stock.name} Stock</h3>
        <form>
          <label htmlFor="stock-quantity">Quantity:</label>
          <input
            type="number"
            id="stock-quantity"
            min="1"
            placeholder="Enter quantity"
          />
          <button type="submit">Buy</button>
        </form>
      </div>

      {/* Financials Section */}
      <div className="financials">
        <h3>Financials</h3>
        <Chart 
          type="bar" 
          data={{
            labels: ["Revenue", "Profit", "Net Worth"],
            datasets: [
              {
                label: `${stock?.name} Financials`,
                data: [150, 120, 100], // Example financial data
                backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
              },
            ],
          }} 
        />
      </div>

      {/* About the Company */}
      <div className="about-company">
        <h3>About {stock.name}</h3>
        <p>
          {stock.name} is a global leader in the industry, known for its innovative products and strong market presence. Established in [year], the company has continuously adapted to market trends and consumer needs.
        </p>
      </div>

      {/* Stock News Section */}
      <div className="stock-news">
        <h3>Latest News about {stock.name}</h3>
        {stock.news.map((newsItem, index) => (
          <div key={index} className="news-item">
            <h4>{newsItem.title}</h4>
            <p>{newsItem.description}</p>
            <small>{newsItem.date}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
