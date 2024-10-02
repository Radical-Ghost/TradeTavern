import { Container, Row, Col, Nav } from "react-bootstrap"; // Ensure to import these components
import BothGraphs from "../components/BothGraphs";
import { Link } from "react-router-dom";

export default function Home() {
	return (
		<>
			<div style={{ display: "flex", width: "100%" }}>
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
									<h>Trade travern</h>
								</Col>
								<Col xs="auto">
									<Nav>
										<Nav.Link href="#register">
											Register
										</Nav.Link>
										<Nav.Link href="#login">Login</Nav.Link>
										<Nav.Link href = '/'>
											Logout
										</Nav.Link>
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
