import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigationbar from './comp/Navbar';
import Home from './Home'; // Create these components
// import Features from './Features';
// import Pricing from './Pricing';
import AboutUs from './AboutUs';
import Dashboard from './Dashboard';
import Community from './Community';
import Help from './Help';
import Invest from './Invest';
import StockGraph from './comp/StockGraph';
import Landing from "./Landing";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


function App() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    
    <>
        <div style={{ display: 'flex' }}>
          {/* <Navigationbar /> */}
          <div className="content" style={{width:'100%'}}>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/invest" element={<Invest />} />
              <Route path="/community" element={<Community />} />
              <Route path="/help" element={<Help />} />
              <Route path="/" element={<Landing />} /> {/* Default route */}
            </Routes>
          </div>
        </div>
    </>
  );
}

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
