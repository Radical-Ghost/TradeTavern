import { Link } from "react-router-dom";
import "../css/Navbar.css";
import classNames from "classnames";
import { useContext, createContext, useState, useEffect } from "react";

export default function Navbar() {
	return (
		<aside
			className="Navbar"
			style={{
				width: "100%",
				height: "8%",
				backgroundColor: "pink",
			}}></aside>
	);
}
