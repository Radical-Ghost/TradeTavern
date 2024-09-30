import Sidebar from "../components/Sidebar";
// import Graph from "./comp/StockGraph";

export default function Invest() {
	return (
		<div style={{ display: "flex" }}>
			<Sidebar />
			<div className="content p-4 mt-4 ml-4 w-100 p-0">
				<h1>Invest page</h1>
			</div>
		</div>
	);
}
