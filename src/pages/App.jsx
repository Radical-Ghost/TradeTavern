import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

// Pages to route
import Home from "./Home";
import Dashboard from "./Dashboard";
import Invest from "./Invest";
import Subscription from "./Subscription";
import Help from "./Help";
import AboutUs from "./AboutUs";
import Landing from "./Landing";
import Sidebar from "../components/Sidebar";
import { SidebarItem } from "../components/Sidebar";
import Navbar from "../components/Navbar";

import StocksDetail from "../pages/StocksDetail";

// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// Icons for sidebar
import { FaHome, FaInfoCircle, FaDollarSign, FaStar } from "react-icons/fa";
import { MdOutlineDashboard, MdHelpOutline } from "react-icons/md";

import { auth } from "../backend/Firebase"; // Firebase auth import
import StockDetail from "./StocksDetail";

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
	const [authLoading, setAuthLoading] = useState(true);
	const [currentUser, setCurrentUser] = useState(null); // Track authenticated user
	const location = useLocation();
	const navigate = useNavigate();
	const isLandingPage = location.pathname === "/";

	// Check if the user is authenticated and redirect if not
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
			setAuthLoading(false); // Stop loading after auth check
		});
		return () => unsubscribe(); // Cleanup the listener
	}, []);

	// Private route component
	const PrivateRoute = ({ element }) => {
		if (authLoading) return null; // Show nothing until auth state is determined
		return currentUser ? element : <Navigate to="/" replace />; // Redirect to landing page if not authenticated
	};

	return (
		<>
			<div style={{ display: "flex", height: "100vh" }}>
				{/* Conditionally render Sidebar */}
				{!isLandingPage && currentUser && (
					<Sidebar>
						<SidebarItem
							icon={<FaHome size={25} style={iconStyle} />}
							text="Home"
							to={`/${currentUser?.uid}/home`}
							active={location.pathname.includes("/home")}
						/>
						<SidebarItem
							icon={
								<MdOutlineDashboard
									size={25}
									style={iconStyle}
								/>
							}
							text="Dashboard"
							to={`/${currentUser?.uid}/dashboard`}
							active={location.pathname.includes("/dashboard")}
						/>
						<SidebarItem
							icon={<FaDollarSign size={25} style={iconStyle} />}
							text="Invest"
							to={`/${currentUser?.uid}/invest`}
							active={location.pathname.includes("/invest")}
						/>
						<SidebarItem
							icon={<FaStar size={25} style={iconStyle} />}
							text="Subscriptions"
							to={`/${currentUser?.uid}/subscriptions`}
							active={location.pathname.includes(
								"/subscriptions"
							)}
						/>
						<hr className="my-3" />
						<SidebarItem
							icon={<MdHelpOutline size={25} style={iconStyle} />}
							text="Help"
							to={`/${currentUser?.uid}/help`}
							active={location.pathname.includes("/help")}
						/>
						<SidebarItem
							icon={<FaInfoCircle size={25} style={iconStyle} />}
							text="About"
							to={`/${currentUser?.uid}/about`}
							active={location.pathname.includes("/about")}
						/>
					</Sidebar>
				)}

				<div className="content" style={{ width: "100%" }}>
					{/* Pass authenticated user to Navbar */}
					{!isLandingPage && <Navbar currentUser={currentUser} />}
					<div
						className="page"
						style={{ height: "92%", overflowY: "scroll" }}>
						<Routes>
							<Route path="/" element={<Landing />} />
							<Route
								path="/:uid/home"
								element={<PrivateRoute element={<Home />} />}
							/>
							<Route
								path="/:uid/dashboard"
								element={
									<PrivateRoute element={<Dashboard />} />
								}
							/>
							<Route
								path="/:uid/invest"
								element={<PrivateRoute element={<Invest />} />}
							/>
							<Route
								path="/:uid/subscriptions"
								element={
									<PrivateRoute element={<Subscription />} />
								}
							/>
							<Route
								path="/:uid/about"
								element={<PrivateRoute element={<AboutUs />} />}
							/>
							<Route
								path="/:uid/help"
								element={<PrivateRoute element={<Help />} />}
							/>
							<Route
								path="/StocksDetail"
								element={
									<PrivateRoute element={<StocksDetail />} />
								}
							/>
							<Route path="*" element={<Navigate to="/" />} />{" "}
							{/* Catch-all route for invalid paths */}
						</Routes>
					</div>
				</div>
			</div>
		</>
	);
}
