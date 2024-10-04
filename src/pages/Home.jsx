import BothGraphs from "../components/BothGraphs";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Home() {
	return (
		<div style={{ display: "flex" }}>
			<div className="content" style={{}}>
				<BothGraphs />
			</div>
		</div>
	);
}
