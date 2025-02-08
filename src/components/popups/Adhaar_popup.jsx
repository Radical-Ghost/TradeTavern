import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../../css/Popup.css";

export default function AadhaarModal({ show, handleClose }) {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [aadhaar, setAadhaar] = useState("");
    const [pan, setPan] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can add logic here to handle form submission
        console.log("Submitted Info:", { email, name, aadhaar, pan });
        
        // Clear the form fields after submission
        setEmail("");
        setName("");
        setAadhaar("");
        setPan("");
        
        // Close the modal
        handleClose();
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            dialogClassName="custom-modall"
            contentClassName="custom-modal">
            <Modal.Header closeButton>
                <Modal.Title>Submit Your Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email ID:</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formName">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formAadhaar">
                        <Form.Label>Aadhaar Number:</Form.Label>
                        <Form.Control
                            type="text"
                            value={aadhaar}
                            onChange={(e) => setAadhaar(e.target.value)}
                            required
                            pattern="\d{12}" // Ensure it's 12 digits
                            title="Please enter a valid 12-digit Aadhaar number"
                        />
                    </Form.Group>
                    <Form.Group controlId="formPan">
                        <Form.Label>PAN Card Number:</Form.Label>
                        <Form.Control
                            type="text"
                            value={pan}
                            onChange={(e) => setPan(e.target.value)}
                            required
                            pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}" // Ensure PAN format
                            title="Please enter a valid PAN card number in the format ABCDE1234F"
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
                            Submit
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}