import { Container, Row, Col, Nav } from "react-bootstrap"; // Ensure to import these components
import Sidebar from "../components/Sidebar";
// import StockGraph from "./comp/StockGraph"; // If you need to use this later
import BothGraphs from "../components/BothGraphs";

export default function Home() {
	return (
		<>
			<div style={{ display: "flex", width: "100%" }}>
				<Sidebar />
				<div className="content" style={{ width: "100%" }}>
					{/* Top Bar */}
					<div
						className="bg-light py-2"
						style={{ marginTop: "-1px" }}>
						<Container>
							<Row className="justify-content-between">
								<Col xs="auto">
									<span>
										<i className="bi bi-geo-alt-fill"></i>{" "}
										Find A Location
									</span>{" "}
									|<span> +01234567890</span> |
									<span> Example@gmail.com</span>
								</Col>
								<Col xs="auto">
									<Nav>
										<Nav.Link href="#register">
											Register
										</Nav.Link>
										<Nav.Link href="#login">Login</Nav.Link>
										<Nav.Link href="/dashboard">
											My Dashboard
										</Nav.Link>
									</Nav>
								</Col>
							</Row>
						</Container>
					</div>

					{/* Both Graphs Section */}
					<BothGraphs />
				</div>
			</div>
		</>
	);
}
