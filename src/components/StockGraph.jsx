import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

const StockGraph = () => {
	// Sample stock data (replace with real stock data from API)
	const stockData = [
		{ date: "2024-09-20", price: 150 },
		{ date: "2024-09-21", price: 160 },
		{ date: "2024-09-22", price: 155 },
		{ date: "2024-09-23", price: 170 },
		{ date: "2024-09-24", price: 165 },
		{ date: "2024-09-25", price: 175 },
		{ date: "2024-09-26", price: 180 },
	];

	return (
		<div
			style={{
				backgroundColor: "#1C2331", // Background for the entire container
				borderRadius: "15px",
				width: "100%",
				height: "100%",
				padding: "20px", // Add padding for spacing
			}}>
			<h3 style={{ 
				color: "#FFFFFF", // White text for the header
				textAlign: "center", 
				marginBottom: "20px", 
			}}>
				Stock Price Over Time
			</h3>
			<ResponsiveContainer width="100%" height="90%">
				<LineChart
					data={stockData}
					style={{
						backgroundColor: "#1C2331", // Background color for the graph area
						borderRadius: "10px", // Rounded corners for the graph
					}}
				>
					<CartesianGrid 
						strokeDasharray="3 3" 
						stroke="#4A5568" // Light gray grid lines
					/>
					<XAxis 
						dataKey="date" 
						stroke="#FFFFFF" // White text for x-axis
						tick={{ fill: "#FFFFFF" }} // White ticks
					/>
					<YAxis 
						stroke="#FFFFFF" // White text for y-axis
						tick={{ fill: "#FFFFFF" }} // White ticks
					/>
					<Tooltip 
						contentStyle={{
							backgroundColor: "#1C2331", // Dark background for tooltip
							color: "#FFFFFF", // White text for tooltip
							border: "1px solid #4A5568", // Light gray border
							borderRadius: "5px", // Rounded corners for tooltip
						}}
					/>
					<Legend 
						wrapperStyle={{
							color: "#FFFFFF", // White text for legend
						}}
					/>
					<Line 
						type="monotone" 
						dataKey="price" 
						stroke="#82ca9d" // Green line for the stock price
						strokeWidth={2} // Thicker line for better visibility
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

export default StockGraph;