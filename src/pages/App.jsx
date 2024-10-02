import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Home"; // Create these components
// import Features from './Features';
// import Pricing from './Pricing';
import AboutUs from "./AboutUs";
import Dashboard from "./Dashboard";
import Community from "./Community";
import Help from "./Help";
import Invest from "./Invest";
import Landing from "./Landing";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Subscribe from '../pages/Subscribe'
//import React, { useState } from 'react';
// import LoginModal from './LoginModal';
// import SignupModal from './components/SignupModal';

export default function App() {
	const location = useLocation();
	const isLandingPage = location.pathname === "/";

	return (
		<>
			<div style={{ display: "flex" }}>
				{/* <Sidebar /> */}
				<div className="content" style={{ width: "100%" }}>
					<Routes>
						<Route path="/home" element={<Home />} />
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/about" element={<AboutUs />} />
						<Route path="/invest" element={<Invest />} />
						<Route path="/community" element={<Community />} />
						<Route path="/help" element={<Help />} />
						<Route path="/subscription" element={<Subscribe />} />

						<Route path="/" element={<Landing />} />{" "}
						{/* Default route */}
					</Routes>
				</div>
			</div>
		</>
	);
}
