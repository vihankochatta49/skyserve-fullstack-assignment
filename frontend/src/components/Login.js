import React, { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${"http://localhost:5000"}/signin`, {
        method: "POST",
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Failed to sign in");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-gl">
      {loading ? (
        <div className="text-center mt-4">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <h2 className="text-center" style={{textAlign:"center"}}>Log In</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <div style={{ textAlign: "center" }}>
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email" className="login-input">
                <Form.Label>Email - </Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password" className="login-input">
                <Form.Label>Password - </Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-100 button-5" type="submit">
                Log In
              </Button>
            </Form>
          </div>

          <div className="w-100 text-center mt-2" style={{textAlign: "center"}}>
            Haven't registered yet?{" "}
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <button className="button-5">Register</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
