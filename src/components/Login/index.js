import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../Firebase";
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btn, setBtn] = useState(false);
  const [err, setErr] = useState("");

  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    if (password.length > 5 && email !== "") {
      setBtn(true);
    } else if (btn) {
      setBtn(false);
    }
  }, [password, email, btn]);

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .loginUser(email, password)
      .then((user) => {
        setEmail("");
        setPassword("");
        props.history.push("/welcome");
      })
      .catch((err) => {
        setErr(err);
        setEmail("");
        setPassword("");
      });
  };
  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftLogin"></div>
        <div className="formBoxRight">
          <div className="formContent">
            {err !== "" && <span> {err.message} </span>}
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="inputBox">
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="off"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <label htmlFor="password">Password</label>
              </div>
              {btn ? (
                <button>Connexion</button>
              ) : (
                <button disabled> Connexion</button>
              )}
            </form>
            <div className="linkContainer">
              <Link to="/signup" className="simpleLink">
                Nouveau sur Marvel Quiz ? Inscrivez-vous maintenant !
              </Link>
              <br />
              <Link to="/forgetpassword" className="simpleLink">
                Mot de passe oublié ?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
