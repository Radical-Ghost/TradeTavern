import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../css/Navbar.css";
import Bckimage from "../images/background.jpg"; // Ensure this path is correct
import { FaSearch } from 'react-icons/fa'; // Import an icon library for search icon

export default function Navbar() {
    const [searchTerm, setSearchTerm] = useState(""); // State to store search input
    const navigate = useNavigate(); // Use navigate hook to navigate

    const handleSearch = (e) => {
        e.preventDefault(); // Prevent default form submission
        if (searchTerm.trim()) {
            // Only redirect if the search term is not empty
            navigate(`/invest?query=${encodeURIComponent(searchTerm)}`);
        }
    };

    return (
        <aside className="Navbar">

            <form className="search-container" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search for invest"
                    className="search-bar-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="search-bar-button">
                    <FaSearch className="search-icon" /> {/* Search icon */}
                </button>
            </form>

			<div className="profile">
				<div className="details">
                    <span className="name details-child">Kamran Dohpaunkar</span>
                    <div className="divider">
                    </div>
                    <span className="subs-type">Tier - 3 </span>    
                </div>
				<Link>
					<img src={Bckimage} className="profile-pic" alt="profile-pic" />
				</Link>
			</div>

            {/* <div className="tooltip">kamran dhoaunkar<br/>kdhopaunkar@gmail.com</div> */}
        </aside>
    );
}
