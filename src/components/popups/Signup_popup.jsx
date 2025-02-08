import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { auth, db } from '../../backend/Firebase'; // Adjust path as needed
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function SignupModal({ show, handleClose }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [panNo, setPANno] = useState(""); // Assuming you have a PAN field
	const navigate = useNavigate(); // Hook for navigation

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// Password confirmation check
			if (password !== confirmPassword) {
				alert("Passwords do not match!");
				return;
			}

			// Create a new user
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			const uid = userCredential.user.uid; 
			console.log("User signed up:", email);

			// Check if the user already exists in Firestore
			const userDocRef = doc(db, "user", uid);
			const userDoc = await getDoc(userDocRef);

			if (!userDoc.exists()) {
				// If user doesn't exist, create the user doc
				await setDoc(userDocRef, {
					email: email,
					uid: uid,

				});
				console.log("New user document created in Firestore.");
			}

			navigate(`/${uid}/home`); // Redirect to user home page

		} catch (error) {
			console.error("Error during signup:", error.message);
			alert("Error: " + error.message);
		}

		// Clear form after submission
		setEmail("");
		setPassword("");
		setConfirmPassword("");
		setPANno("");
		handleClose(); // Close the modal
	};

	const handleGoogleSignIn = async () => {
		const provider = new GoogleAuthProvider();
		try {
			const result = await signInWithPopup(auth, provider);
			const user = result.user;
			const uid = user.uid;
			console.log("User signed in with Google:", user.email);

			// Check if the user exists in Firestore
			const userDocRef = doc(db, "user", uid);
			const userDoc = await getDoc(userDocRef);

			if (!userDoc.exists()) {
				// If user doesn't exist, create the user document in Firestore
				await setDoc(userDocRef, {
					email: user.email,
					uid: uid,
					profilePic: user.photoURL || "", // Save profile picture if available
				});
				console.log("New Google user document created in Firestore.");
			}

			navigate(`/${uid}/home`); // Redirect to user home page

		} catch (error) {
			console.error("Error during Google sign-in:", error.message);
			alert("Error: " + error.message);
		}
	};

	return (
		<Modal
			show={show}
			onHide={handleClose}
			centered
			dialogClassName="custom-modal"
			contentClassName="custom-modal">
			<Modal.Header closeButton>
				<Modal.Title>Sign Up</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit}>
					<Form.Group controlId="formEmail">
						<Form.Label>Email:</Form.Label>
						<Form.Control
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</Form.Group>
					<Form.Group controlId="formPassword">
						<Form.Label>Password:</Form.Label>
						<Form.Control
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</Form.Group>
					<Form.Group controlId="formConfirmPassword">
						<Form.Label>Confirm Password:</Form.Label>
						<Form.Control
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</Form.Group>
					<Form.Group controlId="formPAN">
						<Form.Label>PAN Number:</Form.Label>
						<Form.Control
							type="text"
							value={panNo}
							onChange={(e) => setPANno(e.target.value)}
							required
						/>
					</Form.Group>
					<div className="d-flex justify-content-end mt-3">
						<Button
							variant="secondary"
							onClick={handleClose}
							className="custom-modal-button">
							Close
						</Button>
						<Button
							variant="primary"
							type="submit"
							className="ms-2 custom-modal-button">
							Sign Up
						</Button>
					</div>
				</Form>

				<div className="text-center my-3">
					<span>Or</span>
				</div>

				<div className="d-flex justify-content-center">
					<Button variant="outline-primary" onClick={handleGoogleSignIn}>
						<img src="https://th.bing.com/th?id=OIP.rC4ds-dkwjzSmdyig-1lqwHaHa&w=250&h=250&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=3.1&rm=2" alt="Google logo" style={{ width: "20px", marginRight: "8px" }} />
						Sign in with Google
					</Button>
				</div>
			</Modal.Body>
		</Modal>
	);
}
