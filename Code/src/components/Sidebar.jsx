import { Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import "../css/Sidebar.css";
import classNames from "classnames";
import { useContext, createContext, useState, useEffect } from "react";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
	const [expanded, setExpanded] = useState(true);
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	const buttonStyle = {
		backgroundColor: isHovered ? "#121621" : "transparent",
		fontFamily: '"Playwrite DE Grund", cursive',
		fontSize: "1.5rem",
		fontWeight: "bold",
		border: "none",
		cursor: "pointer",
		transition: "color 0.3s",
		height: "80%",
		marginTop: "5px",
		alignItems: "center",
		display: "flex",
		justifyContent: "center",
	};

	return (
		<aside className="Sidebar">
			<nav
				className={`d-flex flex-column border-end shadow-sm h-100 ${
					expanded ? "" : "collapsed"
				}`}
				style={{
					color: "#8d9498",
					backgroundColor: "#1a2035",
					transition: "width 0.3s ease-in-out",
					width: expanded ? "250px" : "70px",
				}}>
				<div
					className="logo-ham d-flex align-items-center p-2"
					style={{
						justifyContent: expanded ? "space-between" : "center",
						height: "6rem",
					}}>
					{expanded && (
						<Nav.Link
							as={Link}
							to="/"
							style={{
								color: "#19ff30",
								fontFamily: '"Playwrite DE Grund", cursive',
								fontSize: "1.5rem",
								padding: "0.8rem",
								fontWeight: "bold",
							}}>
							TradeTavern
						</Nav.Link>
					)}
					<Button
						onClick={() => setExpanded((curr) => !curr)}
						className="Ham"
						style={buttonStyle}
						size="25"
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}>
						{expanded ? <FaAngleLeft /> : <FaAngleRight />}
					</Button>
				</div>

				<SidebarContext.Provider value={{ expanded }}>
					<ul className="flex-1 list-unstyled">{children}</ul>
				</SidebarContext.Provider>
			</nav>
		</aside>
	);
}

export function SidebarItem({ icon, text, to, active }) {
	const { expanded } = useContext(SidebarContext);
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	const textStyle = {
		marginTop: "6px",
		color: active ? "white" : isHovered ? "white" : "#8d9498",
		textAlign: "left",
		fontWeight: "bold",
		fontSize: "1.2rem",
		transition:
			"width 0.3s ease-in-out 0.1s, visibility 0.3s ease-in-out 0.1s",
		width: expanded ? "auto" : "0",
		visibility: expanded ? "visible" : "hidden",
	};

	const iconStyle = {
		fontSize: "2rem",
		transition: "font-size 0.3s ease-in-out, margin 0.3s ease-in-out",
		color: active ? "#6861ce" : isHovered ? "white" : "#8d9498",
		margin: expanded ? "0 0.8rem 0 0" : "0 auto",
		display: "block",
		textAlign: "center",
	};

	return (
		<li
			className={`position-relative d-flex align-items-center py-2 px-3 my-4 rounded cursor-pointer transition-all`}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			style={{
				backgroundColor: active
					? "#121621"
					: isHovered
					? "#121621"
					: "transparent",	
				borderLeft: active ? "4px solid #6861ce" : "none",
			}}>
			<Nav.Link
				as={Link}
				to={to}
				className="d-flex align-items-center w-100">
				<span style={iconStyle}>{icon}</span>
				<span
					className={classNames("overflow-hidden", {
						"w-52 ml-3": expanded,
						"w-0": !expanded,
					})}
					style={textStyle}>
					{text}
				</span>
				{!expanded && (
					<div
						className={classNames(
							"position-absolute rounded px-2 py-1 ml-6 bg-light text-primary text-sm invisible opacity-20 transition-all",
							{
								"group-hover:visible group-hover:opacity-100 group-hover:translate-x-0":
									!expanded,
							}
						)}>
						{text}
					</div>
				)}
			</Nav.Link>
		</li>
	);
}