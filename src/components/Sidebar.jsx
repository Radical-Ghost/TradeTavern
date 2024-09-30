import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaHome, FaInfoCircle, FaDollarSign } from "react-icons/fa";
import { MdOutlineDashboard, MdHelpOutline } from "react-icons/md";
import { CgCommunity } from "react-icons/cg";
import "../../css/Sidebar.css";

const iconStyle = {
	color: "#8d9498",
	marginTop: "6px",
	marginRight: "0.8rem",
	width: "2rem",
	textAlign: "center",
	verticalAlign: "middle",
	float: "left",
	fontSize: "1rem",
	lineHeight: "1.5rem",
};

const textStyle = {
	color: "#8d9498",
	textAlign: "center",
	verticalAlign: "middle",
	float: "left",
	fontWeight: "bold",
};

export default function Sidebar() {
	return (
		<>
			<div className="sidebar d-flex flex-column justify-content-between">
				<div className="sidebar-header">
					<div className="logo-header d-flex">
						<Nav.Link as={Link} to="/">
							<div className="d-flex">
								<p className="mt-3 text-white">TradeTavern</p>
							</div>
						</Nav.Link>
					</div>
					<Nav className="flex-column p-1">
						<Nav.Link as={Link} to="/home">
							<FaHome style={iconStyle} />{" "}
							<p style={textStyle}>Home</p>
						</Nav.Link>
						<Nav.Link as={Link} to="/dashboard">
							<MdOutlineDashboard style={iconStyle} />{" "}
							<p style={textStyle}>Dashboard</p>
						</Nav.Link>
						<Nav.Link as={Link} to="/invest">
							<FaDollarSign style={iconStyle} />{" "}
							<p style={textStyle}>Invest</p>
						</Nav.Link>
						<Nav.Link as={Link} to="/about">
							<FaInfoCircle style={iconStyle} />{" "}
							<p style={textStyle}>Subscription</p>
						</Nav.Link>
					</Nav>
				</div>
				<div className="sidebar-footer">
					<Nav className="flex-column p-1">
						<h5 className="mt-3 text-white ">Support</h5>
						<Nav.Link as={Link} to="/about">
							<FaInfoCircle style={iconStyle} />{" "}
							<p style={textStyle}>About</p>
						</Nav.Link>
						<Nav.Link as={Link} to="/community">
							<CgCommunity style={iconStyle} />{" "}
							<p style={textStyle}>Community</p>
						</Nav.Link>
						<Nav.Link as={Link} to="/help">
							<MdHelpOutline style={iconStyle} />{" "}
							<p style={textStyle}>Help</p>
						</Nav.Link>
					</Nav>
				</div>
			</div>
		</>
	);
}
