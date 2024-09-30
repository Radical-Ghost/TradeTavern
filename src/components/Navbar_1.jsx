import { useState } from "react";
import { Nav, Offcanvas, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
	FaHome,
	FaTachometerAlt,
	FaInfoCircle,
	FaDollarSign,
	FaUsers,
	FaQuestionCircle,
	FaBars,
} from "react-icons/fa";
import logo from "../../images/Logo.jpg";
import "../../css/Sidebar.css";

export default function Sidebar() {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			Button to open Offcanvas on mobile
			<Button
				variant="primary"
				onClick={handleShow}
				className="d-lg-none">
				<FaBars style={{ fontSize: "25px" }} />
			</Button>
			{/* Offcanvas for mobile view */}
			<Offcanvas show={show} onHide={handleClose} className="bg-light">
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>
						<img
							src={logo}
							alt="Logo"
							style={{
								width: "70px",
								height: "60px",
								borderRadius: "50%",
							}}
						/>
					</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<Nav className="flex-column">
						<Nav.Link as={Link} to="/home" className="text-dark">
							<FaHome className="me-2" /> Home
						</Nav.Link>
						<Nav.Link
							as={Link}
							to="/dashboard"
							className="text-dark">
							<FaTachometerAlt className="me-2" /> Dashboard
						</Nav.Link>
						<Nav.Link as={Link} to="/about" className="text-dark">
							<FaInfoCircle className="me-2" /> About
						</Nav.Link>
						<Nav.Link as={Link} to="/invest" className="text-dark">
							<FaDollarSign className="me-2" /> Invest
						</Nav.Link>
						<h5 className="mt-3 text-dark">Support</h5>
						<Nav.Link
							as={Link}
							to="/community"
							className="text-dark">
							<FaUsers className="me-2" /> Community
						</Nav.Link>
						<Nav.Link as={Link} to="/help" className="text-dark">
							<FaQuestionCircle className="me-2" /> Help
						</Nav.Link>
					</Nav>
				</Offcanvas.Body>
			</Offcanvas>
			{/* Desktop Navbar */}
			<div
				className="d-none d-lg-block sticky-top"
				style={{
					height: "100vh",
					width: "210px",
					backgroundColor: "#1a2035",
					paddingTop: "0",
				}}>
				<img
					src={logo}
					alt="Logo"
					style={{
						width: "70px",
						height: "60px",
						marginBottom: "20px",
						borderRadius: "50%",
						marginLeft: "21px",
						marginTop: "30px",
					}}
				/>
				<Nav className="flex-column p-3">
					<Nav.Link as={Link} to="/home">
						<FaHome className="me-2" /> Home
					</Nav.Link>
					<Nav.Link as={Link} to="/dashboard">
						<FaTachometerAlt className="me-2" /> Dashboard
					</Nav.Link>
					<Nav.Link as={Link} to="/about">
						<FaInfoCircle className="me-2" /> About
					</Nav.Link>
					<Nav.Link as={Link} to="/invest">
						<FaDollarSign className="me-2" /> Invest
					</Nav.Link>
					<h5 className="mt-3 text-white">Support</h5>
					<Nav.Link as={Link} to="/community">
						<FaUsers className="me-2" /> Community
					</Nav.Link>
					<Nav.Link as={Link} to="/help">
						<FaQuestionCircle className="me-2" /> Help
					</Nav.Link>
				</Nav>
			</div>
		</>
	);
}
