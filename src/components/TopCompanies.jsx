import { Card, Col, Row, Container, Button } from "react-bootstrap";
import "../css/TopCompanies.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Sample data for top companies
const topCompanies = [
	{ name: "Company A", symbol: "CMA", price: "$100" },
	{ name: "Company B", symbol: "CMB", price: "$200" },
	{ name: "Company C", symbol: "CMC", price: "$150" },
	{ name: "Company D", symbol: "CMD", price: "$250" },
	{ name: "Company E", symbol: "CME", price: "$300" },
	{ name: "Company F", symbol: "CMF", price: "$350" },
	{ name: "Company G", symbol: "CMG", price: "$400" },
	{ name: "Company H", symbol: "CMH", price: "$450" },
	{ name: "Company I", symbol: "CMI", price: "$500" },
	{ name: "Company J", symbol: "CMJ", price: "$550" },
];

const TopCompanies = () => {
	return (
		<Container
			className="mt-4 scroll-container"
			style={{
				overflowY: "auto",
				marginTop:'0px',
				height: "69vh",
				borderRadius: "15px",
				backgroundColor: "lavender",
				scrollbarWidth: 'none', // Hide scrollbar (Firefox)
				msOverflowStyle: 'none',
				paddingLeft:'3vh',
				marginTop: '10vh',
				
			}}>
			<h4>Top 5 Companies</h4>
			<Row>
				{topCompanies.map((company, index) => (
					<Col md={6} key={index} className="mb-4">
						<Card className="company-card">
							<Card.Body>
								<Card.Title>{company.name}</Card.Title>
								<Card.Subtitle className="text-muted">
									{company.symbol}
								</Card.Subtitle>
								<Card.Text>
									Current Price: {company.price}
								</Card.Text>
								<Button variant="primary">Invest</Button>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>
		</Container>
	);
};

export default TopCompanies;
