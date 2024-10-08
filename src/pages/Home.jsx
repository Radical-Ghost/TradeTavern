import { Link } from "react-router-dom";
import TopCompanies from '../components/TopCompanies'; 
import StockGraph from '../components/StockGraph';

export default function Home() {
	return (
		<div style={{ height:"100%", display: "grid",gridTemplateRows:"70% 30%",gridTemplateColumns:"55% 45%" }}>
			<div style={{}}> 
				<StockGraph />
			</div>
			<div style={{gridColumn:"2" , gridRow:'1/3'}}>
				<TopCompanies />
			</div>
			
			
		</div>
		
	);
}
