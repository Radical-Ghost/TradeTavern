import { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import "../../css/Popup.css";
import { auth } from '../../backend/Firebase'; 
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function LoginModal({ show, handleClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      navigate(`/${user.uid}/home`);
    } catch (error) {
      setError("Error during login: " + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      navigate(`/${user.uid}/home`);
    } catch (error) {
      setError("Error during Google login: " + error.message);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered dialogClassName="custom-modall" contentClassName="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>Sign In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Sign In
          </Button>
        </Form>
        <div className="text-center mt-3">
          <Button variant="outline-danger" onClick={handleGoogleLogin}>
            <img
              src="https://th.bing.com/th?id=OIP.rC4ds-dkwjzSmdyig-1lqwHaHa&w=250&h=250&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=3.1&rm=2"
              alt="Google"
              style={{ width: "20px", marginRight: "8px" }}
            />
            Sign In with Google
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
