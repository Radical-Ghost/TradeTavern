import { useState } from "react";
import { Modal, Button, Form, Spinner, Alert } from "react-bootstrap";
import "../../css/Login_Popup.css";
import { auth, db } from "../../backend/Firebase"; 
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import Backdrop from './Backdrop.jsx'; // Import the Backdrop component

export default function Login_Popup({ show, handleClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const checkAndCreateUserInFirestore = async (user) => {
    const userRef = doc(db, "user", user.uid);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      await setDoc(userRef, { email: user.email, uid: user.uid });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await checkAndCreateUserInFirestore(userCredential.user);
      navigate(`/${userCredential.user.uid}/home`);
      handleClose();
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
    setEmail("");
    setPassword("");
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");

    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      await checkAndCreateUserInFirestore(result.user);
      navigate(`/${result.user.uid}/home`);
      handleClose();
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <>
      <Backdrop show={show} onClick={handleClose} />
      <Modal show={show} onHide={handleClose} centered dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}

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

            <div className="d-flex justify-content-center mt-3">
              {/* <Button variant="secondary" onClick={handleClose} className="custom-modal-button-close">
                Close
              </Button> */}
              <Button variant="primary" type="submit" className="ms-2 custom-modal-button" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : "Login"}
              </Button>
            </div>
          </Form>

          <div className="text-center my-3">
            <span>Or</span>
          </div>

          <div className="d-flex justify-content-center">
            <Button variant="outline-primary" onClick={handleGoogleLogin} disabled={loading}>
              <img src="https://th.bing.com/th?id=OIP.rC4ds-dkwjzSmdyig-1lqwHaHa&w=250&h=250&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=3.1&rm=2" alt="Google logo" className="google-icon" />
              {loading ? <Spinner animation="border" size="sm" /> : "Sign in with Google"}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
