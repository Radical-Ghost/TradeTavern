import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../../css/Popup.css";

export default function LoginModal({ show, handleClose }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle login logic here
		console.log("Email:", email);
		console.log("Password:", password);

		// Clear form after submission
		setEmail("");
		setPassword("");
		handleClose(); // Close the modal
	};

	return (
		<Modal
			show={show}
			onHide={handleClose}
			centered
			dialogClassName="custom-modal"
			contentClassName="custom-modal">
			<Modal.Header closeButton>
				<Modal.Title>Login</Modal.Title>
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
							Login
						</Button>
					</div>
				</Form>
			</Modal.Body>
		</Modal>
	);
}
