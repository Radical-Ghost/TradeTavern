import { Card, Col, Row, Container } from "react-bootstrap";
import "../css/TopCompanies.css";

// Sample data for top companies
const topCompanies = [
	{ name: "Company A", symbol: "CMA", price: "$100" },
	{ name: "Company B", symbol: "CMB", price: "$200" },
	{ name: "Company C", symbol: "CMC", price: "$150" },
	{ name: "Company D", symbol: "CMD", price: "$250" },
	{ name: "Company E", symbol: "CME", price: "$300" },
	{ name: "Company F", symbol: "CME", price: "$300" },
	{ name: "Company G", symbol: "CME", price: "$300" },
	{ name: "Company H", symbol: "CME", price: "$300" },
	{ name: "Company I", symbol: "CME", price: "$300" },
	{ name: "Company J", symbol: "CME", price: "$300" },
	{ name: "Company k", symbol: "CME", price: "$300" },
];

const TopCompanies = () => {
	return (
		<Container
			className="mt-4 scroll-container"
			style={{
				width: "60%",
				overflowY: "auto",
				height: "541px",
				borderRadius: "15px",
				backgroundColor: "lavender",
				marginRight: "10px",
			}}>
			<h4>Top 5 Companies</h4>
			<Row>
				{topCompanies.map((company, index) => (
					<Col md={6} key={index} className="mb-4">
						<Card>
							<Card.Body>
								<Card.Title>{company.name}</Card.Title>
								<Card.Subtitle className="text-muted">
									{company.symbol}
								</Card.Subtitle>
								<Card.Text>
									Current Price: {company.price}
								</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>
		</Container>
	);
};

export default TopCompanies;
