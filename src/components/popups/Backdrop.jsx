import React from 'react';
import '../../css/Backdrop.css'; // Create a new CSS file for the backdrop styles

const Backdrop = ({ show, onClick }) => {
  return show ? <div className="backdrop" onClick={onClick}></div> : null;
};

export default Backdrop;