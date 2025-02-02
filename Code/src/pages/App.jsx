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

// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// Icons for sidebar
import { FaHome, FaInfoCircle, FaDollarSign } from "react-icons/fa";
import { MdOutlineDashboard, MdHelpOutline } from "react-icons/md";

import { auth } from "../backend/Firebase"; // Firebase auth import

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
	const navigate = useNavigate();
	const isLandingPage = location.pathname === "/";

	const [authState, setAuthState] = useState({
		loading: true,
		user: null,
	});

	// Check if the user is authenticated and redirect if not
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setAuthState({ loading: false, user });
			if (!user) {
				// Redirect to login if the user is not logged in
				navigate("/");
			}
		});
		return () => unsubscribe(); // Cleanup the listener
	}, [navigate]);

	// Private route component
	const PrivateRoute = ({ element }) => {
		if (authState.loading) {
			return <div>Loading...</div>; // Show a loading indicator while checking auth state
		}
		return authState.user ? element : <Navigate to="/" />;
	};

	return (
		<>
			<div style={{ display: "flex", height: "100vh" }}>
				{/* Conditionally render Sidebar */}
				{!isLandingPage && authState.user && (
					<Sidebar>
						<SidebarItem
							icon={<FaHome size={25} style={iconStyle} />}
							text="Home"
							to={`/${authState.user.uid}/home`}
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
							to={`/${authState.user.uid}/dashboard`}
							active={location.pathname.includes("/dashboard")}
						/>
						<SidebarItem
							icon={
								<MdOutlineDashboard
									size={25}
									style={iconStyle}
								/>
							}
							text="Invest"
							to={`/${authState.user.uid}/invest`}
							active={location.pathname.includes("/invest")}
						/>
						<SidebarItem
							icon={
								<MdOutlineDashboard
									size={25}
									style={iconStyle}
								/>
							}
							text="Subscriptions"
							to={`/${authState.user.uid}/subscriptions`}
							active={location.pathname.includes(
								"/subscriptions"
							)}
						/>
						<hr className="my-3" />
						<SidebarItem
							icon={
								<MdOutlineDashboard
									size={25}
									style={iconStyle}
								/>
							}
							text="Help"
							to={`/${authState.user.uid}/help`}
							active={location.pathname.includes("/help")}
						/>
						<SidebarItem
							icon={
								<MdOutlineDashboard
									size={25}
									style={iconStyle}
								/>
							}
							text="About"
							to={`/${authState.user.uid}/about`}
							active={location.pathname.includes("/about")}
						/>
					</Sidebar>
				)}

				<div className="content" style={{ width: "100%" }}>
					{!isLandingPage && authState.user && <Navbar />}
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
						</Routes>
					</div>
				</div>
			</div>
		</>
	);
}
