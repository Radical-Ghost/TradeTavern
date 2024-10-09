import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../../css/Popup.css";
import { auth, db } from '../../backend/Firebase'; // Firestore and Auth import
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore"; // Firestore methods

export default function LoginModal({ show, handleClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Function to check if user exists in Firestore or not 
  const checkAndCreateUserInFirestore = async (user) => {
    const userRef = doc(db, "user", user.uid); 
    const userDoc = await getDoc(userRef); 
	// if doc not found crater user
    if (!userDoc.exists()) {
      
      console.log("User not found in Firestore, creating new user document.");
      await setDoc(userRef, {
        email: user.email,
        uid: user.uid,
        
      });
      console.log("New user document created in Firestore:", user.email);
    } else {
      
      console.log("User found in Firestore:", user.email);
    }
  };

  // Handle Email/Password login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check and create user in Firestore if needed
      await checkAndCreateUserInFirestore(user);

      console.log("User logged in:", user.email);
      navigate(`/${user.uid}/home`);
    } catch (error) {
      console.error("Error during login:", error.message);
      alert("Error: " + error.message);
    }

    // Clear form after submission
    setEmail("");
    setPassword("");
    handleClose(); // Close the modal
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check and create user in Firestore if needed
      await checkAndCreateUserInFirestore(user);

      console.log("User logged in with Google:", user.email);
      navigate(`/${user.uid}/home`);
    } catch (error) {
      console.error("Error during Google login:", error.message);
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

        <div className="text-center my-3">
          <span>Or</span>
        </div>

        <div className="d-flex justify-content-center">
          <Button variant="outline-primary" onClick={handleGoogleLogin}>
            <img src="https://th.bing.com/th?id=OIP.rC4ds-dkwjzSmdyig-1lqwHaHa&w=250&h=250&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=3.1&rm=2" alt="Google logo" style={{ width: "20px", marginRight: "8px" }} />
            Sign in with Google
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
