import React from "react";
import TopCompanies from '../components/TopCompanies';
import StockGraph from '../components/StockGraph';
import CompanyNews from "../components/CompanyNews";

const Home = () => {
	return (
		<div style={{
			backgroundColor: "#0F1621", // Dark background for a sleek look
			minHeight: "100vh",
			display: "flex",
			flexDirection: "column",
			gap: "20px",
			padding: "20px",
			boxSizing: "border-box",
			fontFamily: "'Inter', sans-serif", // Modern sans-serif font
			color: "#FFFFFF", // White text for contrast
		}}>
			{/* Top Row: Stock Graph and Top Companies */}
			<div style={{
				display: "flex",
				flexDirection: "row",
				gap: "20px",
				flex: 1,
			}}>
				{/* Left Column: Stock Graph */}
				<div style={{
					flex: 1,
					backgroundColor: "#1C2331", // Darker background for the graph
					borderRadius: "15px",
					height: "71vh",
					overflow: "hidden",
					boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)", // Subtle shadow for depth
					border: "1px solid rgba(255, 255, 255, 0.1)", // Subtle border
				}}>
					<StockGraph />
				</div>

				{/* Right Column: Top Companies */}
				<div style={{
					flex: 0.6,
					backgroundColor: "#1C2331", // Darker background for the companies list
					borderRadius: "15px",
					overflowY: "auto",
					height: "71vh",
					boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)", // Subtle shadow for depth
					border: "1px solid rgba(255, 255, 255, 0.1)", // Subtle border
				}}>
					<TopCompanies />
				</div>
			</div>

			{/* Bottom Row: Company News (Full Width) */}
			<div style={{
				backgroundColor: "#1C2331", // Darker background for the news section
				borderRadius: "15px",
				padding: "20px",
				width: "100%",
				overflowY: "auto",
				boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)", // Subtle shadow for depth
				border: "1px solid rgba(255, 255, 255, 0.1)", // Subtle border
			}}>
				<CompanyNews />
			</div>
		</div>
	);
};

export default Home;