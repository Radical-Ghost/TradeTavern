import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../../css/Popup.css";
import { auth } from "../../backend/Firebase"; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"; 
import { useNavigate } from "react-router-dom";

export default function SignupModal({ show, handleClose }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [panNo, setPANno] = useState(""); 
	const [isSignUp, setIsSignUp] = useState(true); 

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			if (isSignUp) {
				if (password !== confirmPassword) {
					alert("Passwords do not match!");
					return;
				}
				await createUserWithEmailAndPassword(auth, email, password);
				console.log("User signed up:", email);
			} else {
				await signInWithEmailAndPassword(auth, email, password);
				console.log("User signed in:", email);
			}
			navigate("/home");
		} catch (error) {
			console.error("Error during authentication:", error.message);
			alert("Error: " + error.message);
		}

		// Clear form after submission
		setEmail("");
		setPassword("");
		setPANno("");
		setConfirmPassword("");
		handleClose(); // Close the modal
	};

	// Google Sign-In Function
	const handleGoogleSignIn = async () => {
		const provider = new GoogleAuthProvider();
		try {
			const result = await signInWithPopup(auth, provider);
			const user = result.user;
			console.log("User signed in with Google:", user.email);
			navigate("/home");
		} catch (error) {
			console.error("Error during Google sign in:", error.message);
			alert("Error: " + error.message);
		}
	};

	return (
		<Modal show={show} onHide={handleClose} centered dialogClassName="custom-modall"
			contentClassName="custom-modal">
			<Modal.Header closeButton>
				 
				<Modal.Title>{isSignUp ? "Sign Up" : "Sign In"}</Modal.Title>
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
					{isSignUp && (
						<>
							<Form.Group controlId="PAN_NO">
								<Form.Label>PAN No:</Form.Label>
								<Form.Control
									type="text"
									value={panNo}
									onChange={(e) => setPANno(e.target.value)}
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
						</>
					)}
					{!isSignUp && (
						<Form.Group controlId="formPassword">
							<Form.Label>Password:</Form.Label>
							<Form.Control
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</Form.Group>
					)}
					<div className="d-flex justify-content-end mt-3">
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
						<Button
							variant="primary"
							type="submit"
							className="ms-2"
						>
							{isSignUp ? "Sign Up" : "Sign In"}
						</Button>
					</div>
				</Form>
				<div className="text-center mt-3">
					<Button variant="lin" onClick={() => setIsSignUp(!isSignUp)} className="w-100"> 
						{isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
					</Button>
				</div>

				{/* Google Sign In Button */}
				<div className="text-center mt-3">
					<Button variant="outline-danger" onClick={handleGoogleSignIn} className="w-100">
						<img src="https://th.bing.com/th?id=OIP.rC4ds-dkwjzSmdyig-1lqwHaHa&w=250&h=250&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=3.1&rm=2" alt="Google" style={{ width: "20px", marginRight: "8px" }} />
						{isSignUp ? "Sign Up with Google" : "Sign In with Google"}
					</Button>
				</div>
			</Modal.Body>
		</Modal>
	);
}
