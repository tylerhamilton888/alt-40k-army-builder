import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { getUserByEmail, getAllUsers } from "../../services/userService";

export const Login = () => {
  const [email, setEmail] = useState("rogal@terra.com");
  const [userEmails, setUserEmails] = useState([]);
  const [showEmails, setShowEmails] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Get user by email from database, then store user in local storage
    getUserByEmail(email).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0];
        localStorage.setItem(
          "game_user",
          JSON.stringify({
            id: user.id,
            username: user.username
          })
        );
        navigate("/home");
      } else {
        window.alert("Invalid login");
      }
    });
  };

  const handleFetchEmails = () => {
    if (showEmails) {
      setShowEmails(false);
      setUserEmails([]);
    } else {
      getAllUsers().then((users) => {
        const emails = users.map(user => user.email);
        setUserEmails(emails);
        setShowEmails(true);
      });
    }
  };

  return (
    <main className="container-login">
      <section>
        <form className="form-login" onSubmit={handleLogin}>
          <h1>Welcome To The Alt 40k Army Builder</h1>
          <p>For the Emperor!</p>
          <h2>Please sign in</h2>
          <fieldset>
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(evt) => setEmail(evt.target.value)}
                className="form-control"
                placeholder="Email address"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <button className="login-btn btn-info" type="submit">
                Sign in
              </button>
            </div>
          </fieldset>
        </form>
      </section>
      <section className="form-group-register">
        <Link to="/register">Not a member yet?</Link>
      </section>
      <section className="form-group-emails">
        <button onClick={handleFetchEmails} className="btn btn-secondary">Developer list of email logins</button>
        {showEmails && (
          <ul>
            {userEmails.map((email, index) => (
              <li key={index}>{email}</li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};
