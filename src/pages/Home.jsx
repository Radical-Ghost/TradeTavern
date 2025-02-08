import React from "react";
import TopCompanies from '../components/TopCompanies';
import StockGraph from '../components/StockGraph';
import CompanyNews from "../components/CompanyNews"; // Import the new component

const Home = () => {
	return (
		<div style={{
			height: "100vh",
			display: "flex",
			flexDirection: "row",
			gap: "20px",
			padding: "20px"
		}}>
			{/* Left Column: Stock Graph and News */}
			<div style={{
				flex: 1,
				display: "flex",
				flexDirection: "column",
				gap: "20px",
				marginTop:'-2vh',
			}}>
				<StockGraph />
				<CompanyNews /> {/* News appears below the graph */}
			</div>

			{/* Right Column: Top Companies */}
			<div style={{
				flex: 0.6,
				overflowY: "auto",
				height: "66%",
				backgroundColor: "lavender",
				borderRadius: "15px",
				
			}}>
				<TopCompanies />
			</div>
		</div>
	);
};

export default Home;
