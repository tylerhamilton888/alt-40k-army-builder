import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { createUser, getUserByEmail } from "../../services/userService";
import { Button, Form } from "react-bootstrap";

export const Register = (props) => {
  const [customer, setCustomer] = useState({
    email: "",
    name: "",
    isStaff: false,
  });
  let navigate = useNavigate();

  const registerNewUser = () => {
    createUser(customer).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        // Redirect to login page after successful registration
        navigate("/login");
      }
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    getUserByEmail(customer.email).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists");
      } else {
        // Good email, create user.
        registerNewUser();
      }
    });
  };

  const updateCustomer = (evt) => {
    const copy = { ...customer };
    copy[evt.target.id] = evt.target.value;
    setCustomer(copy);
  };

  return (
    <main className="auth-box">
      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-2">
          <h1><span className="title-style">Seneca Creek Sprigs</span></h1>
          <span className="body-style">Please Register</span>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            onChange={updateCustomer}
            type="text"
            id="name"
            placeholder="Enter your name"
            required
            autoFocus
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            onChange={updateCustomer}
            type="email"
            id="email"
            placeholder="Email address"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            label="I am an employee"
            onChange={(evt) => {
              const copy = { ...customer };
              copy.isStaff = evt.target.checked;
              setCustomer(copy);
            }}
            type="checkbox"
            id="isStaff"
            className="text-center"
          />
        </Form.Group>
        <Form.Group>
          <Button variant="light" type="submit">
            Register
          </Button>
        </Form.Group>
      </Form>
    </main>
  );
};
