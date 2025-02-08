import { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import "../../css/Popup.css";
import { auth, db } from "../../backend/Firebase"; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"; 
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore"; 

export default function SignupModal({ show, handleClose }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState(""); // State for first name
    const [lastName, setLastName] = useState(""); // State for last name
    const [isSignUp, setIsSignUp] = useState(true);
    const [error, setError] = useState(""); // State to handle errors
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (isSignUp) {
            if (!validateEmail(email)) {
                setError("Please enter a valid email.");
                return;
            }

            if (password !== confirmPassword) {
                setError("Passwords do not match.");
                return;
            }

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const uid = userCredential.user.uid;

                const userDocRef = doc(db, "user", uid);
                const userDoc = await getDoc(userDocRef);

                if (!userDoc.exists()) {
                    await setDoc(userDocRef, { 
                        email, 
                        uid, 
                        firstName,    // Store first name
                        lastName      // Store last name
                    });
                }

                navigate(`/${uid}/home`);
            } catch (error) {
                setError("Error during sign up: " + error.message);
            }
        } else {
            // Sign-in flow
            try {
                await signInWithEmailAndPassword(auth, email, password);
                navigate("/home");
            } catch (error) {
                setError("Error during sign in: " + error.message);
            }
        }

        // Clear input fields
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setFirstName(""); // Clear first name
        setLastName("");  // Clear last name
        handleClose();
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const uid = user.uid;

            const userDocRef = doc(db, "user", uid);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                await setDoc(userDocRef, {
                    email: user.email,
                    uid: uid,
                    profilePic: user.photoURL || "",
                });
            }

            navigate(`/${uid}/home`);
        } catch (error) {
            setError("Error during Google sign-in: " + error.message);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered dialogClassName="custom-modall" contentClassName="custom-modal">
            <Modal.Header closeButton>
                <Modal.Title>{isSignUp ? "Sign Up" : "Sign In"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    {isSignUp && (
                        <>
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
                        </>
                    )}
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
                        <Button variant="primary" type="submit" className="ms-2">
                            {isSignUp ? "Sign Up" : "Sign In"}
                        </Button>
                    </div>
                </Form>
                <div className="text-center mt-3">
                    <Button variant="lin" onClick={() => setIsSignUp(!isSignUp)} className="w-100">
                        {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                    </Button>
                </div>
                <div className="text-center mt-3">
                    <Button variant="outline-danger" onClick={handleGoogleSignIn} className="w-100">
                        <img
                            src="https://th.bing.com/th?id=OIP.rC4ds-dkwjzSmdyig-1lqwHaHa&w=250&h=250&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=3.1&rm=2"
                            alt="Google"
                            style={{ width: "20px", marginRight: "8px" }}
                        />
                        {isSignUp ? "Sign Up with Google" : "Sign In with Google"}
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
}
