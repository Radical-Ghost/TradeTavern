import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../../css/Popup.css";
import { db } from "../../backend/Firebase"; // Import Firestore
import { doc, setDoc } from "firebase/firestore"; // Firestore methods
import { getAuth } from "firebase/auth"; // Import Auth

export default function AadhaarModal({ show, handleClose }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [aadhaar, setAadhaar] = useState("");
    const [pan, setPan] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Get current authenticated user
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            console.error("No user is currently authenticated.");
            alert("You must be signed in to submit your details.");
            return;
        }

        const uid = user.uid;  // Use authenticated user's uid

        try {
            // Save user info in Firestore under user/{uid}
            await setDoc(doc(db, "user", uid), {
                firstName,
                lastName,
                aadhaar,
                pan,
                email: user.email, // Automatically fetch and save the user's email
            });

            console.log("User data successfully saved to Firestore!");

            // Clear form fields after submission
            setFirstName("");
            setLastName("");
            setAadhaar("");
            setPan("");

            // Close the modal
            handleClose();
        } catch (error) {
            console.error("Error saving user data to Firestore:", error.message, error.code);
            alert("Failed to save your details. Please try again.");
        }
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
                    <Form.Group controlId="formFirstName">
                        <Form.Label>First Name:</Form.Label>
                        <Form.Control
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formLastName">
                        <Form.Label>Last Name:</Form.Label>
                        <Form.Control
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
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
