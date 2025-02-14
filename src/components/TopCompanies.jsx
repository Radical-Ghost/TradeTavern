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

// Styles object
const styles = {
	container: {
		overflowY: "auto",
		marginTop: "0px",
		height: "66vh",
		borderRadius: "15px",
		backgroundColor: "#1C2331",
		scrollbarWidth: "none", // Hide scrollbar (Firefox)
		msOverflowStyle: "none",
		paddingLeft: "3vh",
		marginTop: "10vh",
	},
	header: {
		color: "white",
	},
	card: {
		backgroundColor: "#2C3E50",
		color: "white",
	},
	button: {
		backgroundColor: "#2C3E50", // Dark background
		border: "1px solid #4A5568", // Muted border
		color: "#FFFFFF", // White text
		padding: "10px 20px",
		borderRadius: "5px",
		// fontFamily: "'Inter', sans-serif", // Modern sans-serif font
		fontSize: "16px",
		cursor: "pointer",
		transition: "all 0.3s ease",
	},
	buttonHover: {
		backgroundColor: "#4A5568", // Slightly lighter background on hover
		borderColor: "#00E5FF", // Neon border on hover
	},
};

// Reusable CompanyCard component
const CompanyCard = ({ company }) => {
	return (
		<Col md={6} className="mb-4">
			<Card className="company-card" style={styles.card}>
				<Card.Body>
					<Card.Title style={{ color: "white" }}>
						{company.name}
					</Card.Title>
					<Card.Subtitle
						className="text-mued"
						style={{ color: "white" }}>
						{company.symbol}
					</Card.Subtitle>
					<Card.Text>Current Price: {company.price}</Card.Text>
					<Button
						variant="primary"
						style={styles.button}
						onMouseEnter={(e) => {
							e.target.style.backgroundColor = styles.buttonHover.backgroundColor;
							e.target.style.borderColor = styles.buttonHover.borderColor;
						}}
						onMouseLeave={(e) => {
							e.target.style.backgroundColor = styles.button.backgroundColor;
							e.target.style.borderColor = "#4A5568";
						}}>
						Invest
					</Button>
				</Card.Body>
			</Card>
		</Col>
	);
};

// Main TopCompanies component
const TopCompanies = () => {
	return (
		<Container className="mt-4 scroll-container" style={styles.container}>
			<h4 style={styles.header}>Top 5 Companies</h4>
			<Row>
				{topCompanies.map((company, index) => (
					<CompanyCard key={index} company={company} />
				))}
			</Row>
		</Container>
	);
};

export default TopCompanies;