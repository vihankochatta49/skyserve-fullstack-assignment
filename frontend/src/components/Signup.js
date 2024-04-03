import React, { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const phoneref = useRef();
  const nameref = useRef();

  function handleSubmit(e) {
    setError("");
    setLoading(true);
    e.preventDefault();
    if (passwordRef.current.value.length < 6) {
      setLoading(false);
      return setError("Password too short, at least 6 characters are required.");
    }
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setLoading(false);
      return setError("Passwords do not match");
    }

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const phone = phoneref.current.value;
    const name = nameref.current.value;

    axios
      .post(`${"http://localhost:5000"}/signup`, {
        name,
        email,
        password,
        phone,
      })
      .then(() => {
        axios
          .post(`${"http://localhost:5000"}/signin`, {
            email,
            password,
          })
          .then((response) => {
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
          })
          .catch((err) => {
            setLoading(false);
            setError("Failed to update data in the database.");
          });
      })
      .catch((err) => {
        setLoading(false);
        setError("Error signing up.");
      });
  }

  return (
    <div>
      <div className="signup-gl" style={{ height: "500px" }}>
        {loading ? (
          <div className="text-center mt-4">
            <p>Loading...</p>
          </div>
        ) : (
          <>
            <h2 className="text-center mb-4" style={{textAlign: "center"}}>Sign Up</h2>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <div style={{ textAlign: "center" }}>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email - </Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name - </Form.Label>
                  <Form.Control type="text" ref={nameref} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="phone">
                  <Form.Label>Contact Number - </Form.Label>
                  <Form.Control type="tel" ref={phoneref} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password - </Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password-confirm">
                  <Form.Label>Confirm Password - </Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    required
                  />
                </Form.Group>
                <Button disabled={loading} style={{margin: "10px"}} className="w-100" type="submit">
                  Sign Up
                </Button>
              </Form>
            </div>
            <div className="w-100 text-center mt-2" style={{textAlign:"center"}}>
              Already registered?{" "}
              <Link to="/" className="btn btn-link">
                Login
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
