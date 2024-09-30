import Sidebar from "../components/Sidebar.jsx";
// import Graph from './comp/StockGraph';

export default function Community() {
	return (
		<div style={{ display: "flex" }}>
			<Sidebar />
			<div
				className="content p-4"
				style={{
					marginTop: "-23px",
					marginLeft: "-24px",
					width: "100%",
					padding: "0px",
				}}>
				<h1>Community Page</h1>
			</div>
		</div>
	);
}
