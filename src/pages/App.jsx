
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

// Pages to route
import Home from "./Home";
import Dashboard from "./Dashboard";
import Invest from "./Invest";
import Community from "./Community";
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
import { CgCommunity } from "react-icons/cg";

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


  // Check if the user is authenticated and redirect if not
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Redirect to login if the user is not logged in
        navigate("/");
      }
    });
    return () => unsubscribe(); // Cleanup the listener
  }, [navigate]);

  // Private route component
  const PrivateRoute = ({ element }) => {
    return auth.currentUser ? element : navigate("/");
  };

  return (
    <>
      <div style={{ display: "flex", height: "100vh" }}>
        {/* Conditionally render Sidebar */}
        {!isLandingPage && (
          <Sidebar>
            <SidebarItem
              icon={<FaHome size={25} style={iconStyle} />}
              text="Home"
              to={`/${auth.currentUser.uid}/home`} 
              active={location.pathname.includes("/home")}
            />
            <SidebarItem
              icon={<MdOutlineDashboard size={25} style={iconStyle} />}
              text="Dashboard"
              to={`/${auth.currentUser.uid}/dashboard`}
              active={location.pathname.includes("/dashboard")}
            />
            <SidebarItem
              icon={<MdOutlineDashboard size={25} style={iconStyle} />}
              text="Invest"
              to={`/${auth.currentUser.uid}/invest`}
              active={location.pathname.includes("/invest")}
            />
            <SidebarItem
              icon={<MdOutlineDashboard size={25} style={iconStyle} />}
              text="Community"
              to={`/${auth.currentUser.uid}/community`}
              active={location.pathname.includes("/community")}
            />
            <SidebarItem
              icon={<MdOutlineDashboard size={25} style={iconStyle} />}
              text="Subscriptions"
              to={`/${auth.currentUser.uid}/subscriptions`}
              active={location.pathname.includes("/subscriptions")}
            />
            <hr className="my-3" />
            <SidebarItem
              icon={<MdOutlineDashboard size={25} style={iconStyle} />}
              text="Help"
              to={`/${auth.currentUser.uid}/help`}
              active={location.pathname.includes("/help")}
            />
            <SidebarItem
              icon={<MdOutlineDashboard size={25} style={iconStyle} />}
              text="About"
              to={`/${auth.currentUser.uid}/about`}
              active={location.pathname.includes("/about")}
            />
          </Sidebar>
          )}

        <div className="content" style={{ width: "100%" }}>
          {!isLandingPage && <Navbar />}
          <div
            className="page"
            style={{ height: "92%", overflowY: "scroll" }}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/:uid/home" element={<PrivateRoute element={<Home />} />} /> 
              <Route path="/:uid/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
              <Route path="/:uid/invest" element={<PrivateRoute element={<Invest />} />} />
              <Route path="/:uid/community" element={<PrivateRoute element={<Community />} />} />
              <Route path="/:uid/subscriptions" element={<PrivateRoute element={<Subscription />} />} />
              <Route path="/:uid/about" element={<PrivateRoute element={<AboutUs />} />} />
              <Route path="/:uid/help" element={<PrivateRoute element={<Help /> } />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}
