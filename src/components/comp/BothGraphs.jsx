import TopCompanies from "./TopCompanies"; // Import the TopCompanies component
import StockGraph from "./StockGraph"; // Assume you have a StockGraph component

const main_page = () => {
	return (
		<div className="row" style={{
      display: "gird",
      gridTemplateColumns: "1fr 1fr",
      
    }}>
			<div className="col">
				<StockGraph />
			</div>
			<div className="col">
				<TopCompanies />
			</div>
		</div>
	);
};

export default main_page;
