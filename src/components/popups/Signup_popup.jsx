import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../../css/Popup.css";

export default function SignupModal({ show, handleClose }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle signup logic here
		console.log("Email:", email);
		console.log("Password:", password);
		console.log("Confirm PAN:");
		console.log("Confirm Password:", confirmPassword);

		// Clear form after submission
		setEmail("");
		setPassword("");
		setPANno("");
		setConfirmPassword("");
		handleClose(); // Close the modal
	};

	return (
		<Modal show={show} onHide={handleClose} centered>
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
					<Form.Group controlId="PAN_NO">
						<Form.Label>Pan no:</Form.Label>
						<Form.Control
							type="number"
							value={Number}
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
					<div className="d-flex justify-content-end mt-3">
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
						<Button
							variant="primary"
							type="submit"
							className="ms-2">
							Sign Up
						</Button>
					</div>
				</Form>
			</Modal.Body>
		</Modal>
	);
}
