import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { getUserByEmail } from "../../services/userService";
import { Button, Form } from "react-bootstrap";

export const Login = () => {
  const [email, set] = useState("susan.phillips@example.com");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    getUserByEmail(email).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0];
        localStorage.setItem(
          "game_user",
          JSON.stringify({
            id: user.id,
            isDev: user.isDev,
          })
        );

        navigate("/");
      } else {
        window.alert("Invalid login");
      }
    });
  };

  return (
    <main className="auth-box">
      <section>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-2">
          <h1><span className="title-style">Welcome to the Alt 40k Army Builder</span></h1>
          <span className="body-style">Please sign in</span></Form.Group>
          <Form.Group className="mb-3">
              <Form.Control
                type="email"
                id="email"
                value={email}
                onChange={(evt) => set(evt.target.value)}
                placeholder="Email address"
                required
                autoFocus
              />
          </Form.Group>
          <Form.Group className="mb-3">
              <Button variant="light" type="submit">
                Sign in
              </Button>
          </Form.Group>
        </Form>
      </section>
      <section>
        <Link className="link" to="/register">Not a member yet?</Link>
      </section>
    </main>
  );
};
