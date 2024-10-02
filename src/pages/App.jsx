import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Home";
import AboutUs from "./AboutUs";
import Dashboard from "./Dashboard";
import Community from "./Community";
import Help from "./Help";
import Invest from "./Invest";
import Landing from "./Landing";
import Sidebar from "../components/Sidebar";
import { SidebarItem } from "../components/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { FaHome, FaInfoCircle, FaDollarSign } from "react-icons/fa";
import { MdOutlineDashboard, MdHelpOutline } from "react-icons/md";
import { CgCommunity } from "react-icons/cg";
import Subscription from "./Subscription";

const iconStyle = {
	marginRight: "0.8rem",
	width: "2rem",
	textAlign: "center",
	verticalAlign: "middle",
	float: "left",
	fontSize: "1.5rem",
	lineHeight: "2rem",
};

export default function App() {
	const location = useLocation();
	const isLandingPage = location.pathname === "/";

	return (
		<>
			<div style={{ display: "flex", height: "100vh" }}>
				{/* Conditionally render Sidebar */}
				{!isLandingPage && (
					<Sidebar>
						<SidebarItem
							icon={<FaHome size={25} style={iconStyle} />}
							text="Home"
							to="/home"
							active={location.pathname === "/home"}
						/>
						<SidebarItem
							icon={
								<MdOutlineDashboard
									size={25}
									style={iconStyle}
								/>
							}
							text="Dashboard"
							to="/dashboard"
							active={location.pathname === "/dashboard"}
						/>
						<SidebarItem
							icon={<FaDollarSign size={25} style={iconStyle} />}
							text="Invest"
							to="/invest"
							active={location.pathname === "/invest"}
						/>
						<SidebarItem
							icon={<CgCommunity size={25} style={iconStyle} />}
							text="Community"
							to="/community"
							active={location.pathname === "/community"}
						/>
						<SidebarItem
							icon={<CgCommunity size={25} style={iconStyle} />}
							text="Subscriptions"
							to="/subscriptions"
							active={location.pathname === "/subscriptions"}
						/>
						<hr className="my-3" />
						<SidebarItem
							icon={<MdHelpOutline size={25} style={iconStyle} />}
							text="Help"
							to="/help"
							active={location.pathname === "/help"}
						/>
						<SidebarItem
							icon={<FaInfoCircle size={25} style={iconStyle} />}
							text="About"
							to="/about"
							active={location.pathname === "/about"}
						/>
					</Sidebar>
				)}
				<div className="content" style={{ width: "100%" }}>
					<Routes>
						<Route path="/" element={<Landing />} />
						<Route path="/home" element={<Home />} />
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/invest" element={<Invest />} />
						<Route path="/community" element={<Community />} />
						<Route
							path="/subscriptions"
							element={<Subscription />}
						/>
						<Route path="/about" element={<AboutUs />} />
						<Route path="/help" element={<Help />} />
						{/* Default route */}
					</Routes>
				</div>
			</div>
		</>
	);
}
