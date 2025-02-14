import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { auth, db } from '../../backend/Firebase';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../../css/Signup_Popup.css";
import Backdrop from './Backdrop.jsx'; // Import the Backdrop component


export default function SignupModal({ show, handleClose }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [panNo, setPANno] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            setLoading(false);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;
            console.log("User signed up:", email);

            const userDocRef = doc(db, "users", uid);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                await setDoc(userDocRef, {
                    email: email,
                    uid: uid,
                    panNo: panNo,
                });
                console.log("User added to Firestore.");
            }

            setLoading(false);
            navigate(`/${uid}/home`);
            handleClose();

        } catch (error) {
            console.error("Signup error:", error.message);
            alert("Error: " + error.message);
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const uid = user.uid;

            const userDocRef = doc(db, "users", uid);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                await setDoc(userDocRef, {
                    email: user.email,
                    uid: uid,
                    profilePic: user.photoURL || "",
                });
                console.log("Google user added to Firestore.");
            }

            setLoading(false);
            navigate(`/${uid}/home`);
            handleClose();

        } catch (error) {
            console.error("Google Sign-in error:", error.message);
            alert("Error: " + error.message);
            setLoading(false);
        }
    };

    return (
        <>
        <Backdrop show={show} onClick={handleClose} />
        <Modal show={show} onHide={handleClose} centered dialogClassName="custom-modal">
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
                            disabled={loading}
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </Form.Group>
                    <Form.Group controlId="formConfirmPassword">
                        <Form.Label>Confirm Password:</Form.Label>
                        <Form.Control
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </Form.Group>
                    <Form.Group controlId="formPAN">
                        <Form.Label>PAN Number:</Form.Label>
                        <Form.Control
                            type="text"
                            value={panNo}
                            onChange={(e) => setPANno(e.target.value)}
                            required
                            pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                            title="Format: ABCDE1234F"
                            disabled={loading}
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-center mt-3">
                        {/* <Button variant="secondary" onClick={handleClose} className="custom-modal-button close-btn" disabled={loading}>
                            Close
                        </Button> */}
                        <Button variant="primary" type="submit" className="ms-2 custom-modal-button submit-btn" disabled={loading}>
                            {loading ? "Signing Up..." : "Sign Up"}
                        </Button>
                    </div>
                </Form>

                <div className="text-center my-3">
                    <span>Or</span>
                </div>

                <div className="d-flex justify-content-center">
                    <Button variant="outline-primary" onClick={handleGoogleSignIn} disabled={loading} className="google-btn">
                        <img src="https://th.bing.com/th?id=OIP.rC4ds-dkwjzSmdyig-1lqwHaHa&w=250&h=250&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=3.1&rm=2" alt="Google logo" className="google-icon" />
                        {loading ? "Signing In..." : "Sign in with Google"}
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
        </>
    );
}
