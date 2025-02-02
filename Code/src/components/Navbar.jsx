import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../css/Navbar.css";
import Bckimage from "../images/background.jpg"; // Ensure this path is correct
import { FaSearch } from 'react-icons/fa'; // Import an icon library for search icon
import { doc, getDoc } from "firebase/firestore"; // Firestore methods
import { auth, db } from "../backend/Firebase";  // Import Firebase auth and Firestore

export default function Navbar() {
    const [searchTerm, setSearchTerm] = useState(""); // State to store search input
    const [firstName, setFirstName] = useState(""); // State for first name
    const [lastName, setLastName] = useState(""); // State for last name
    const [email, setEmail] = useState(""); // State for email
    const navigate = useNavigate(); // Use navigate hook to navigate

    // Fetch user data from Firestore
    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;

            if (user) {
                const uid = user.uid;  // Get the current user's UID
                setEmail(user.email);  // Get user email

                // Firestore document reference for the current user
                const userDocRef = doc(db, "user", uid); 
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const data = userDoc.data();
                    setFirstName(data.firstName || ""); // Set first name from Firestore
                    setLastName(data.lastName || ""); // Set last name from Firestore
                } else {
                    console.log("No such document exists in Firestore.");
                }
            }
        };

        fetchUserData();
    }, []); // Empty dependency array to run once on mount

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
                    <span className="name details-child">{firstName} {lastName}</span> {/* Show first and last name */}
                    <div className="divider"></div>
                    <span className="subs-type">Tier - 3</span>    
                </div>
                {auth.currentUser && (
                    <Link to={`/${auth.currentUser.uid}/dashboard`}> {/* Link to user's dashboard */}
                        <img src={Bckimage} className="profile-pic" alt="profile-pic" />
                    </Link>
                )}
            </div>

            {/* Tooltip with the user's first name, last name, and email */}
            <div className="tooltip">
                {firstName} {lastName}
                <br />
                {email}
            </div>
        </aside>
    );
}
