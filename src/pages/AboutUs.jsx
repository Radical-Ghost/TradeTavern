import Sidebar from "../components/Sidebar.jsx";
// import Graph from './comp/StockGraph';

export default function AboutUs() {
	return (
		<div style={{ display: "flex" }}>
			<Sidebar />
			<div className="content p-4 mx-4 w-100 p-0">
				<h1>About us page</h1>
			</div>
		</div>
	);
}
