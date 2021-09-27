import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../Firebase";
const ForgetPassword = (props) => {
  const firebase = useContext(FirebaseContext);
  const [email, setEmail] = useState("");
  const [succes, setSucces] = useState(null);
  const [wrong, setWrong] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .passwordReset(email)
      .then((result) => {
        setWrong(null);
        setSucces(
          `Consultez votre boite mail : ${email} pour changer le Mot de passe`
        );
        setEmail("");
        setTimeout(() => {
          props.history.push("/login");
        }, 5000);
      })
      .catch((err) => {
        setWrong(err);
        setEmail("");
      });
  };

  const disabled = email === "";

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftForget"></div>
        <div className="formBoxRight">
          <div className="formContent">
            {succes && (
              <span
                style={{
                  border: "1px solid green",
                  background: "green",
                  color: "white",
                }}
              >
                {succes}
              </span>
            )}
            {wrong && <span>{wrong.message} </span>}

            <h2>Mot de passe oublié ?</h2>
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
              <button disabled={disabled}>Récupérer</button>
            </form>
            <div className="linkContainer">
              <Link to="/login" className="simpleLink">
                Déjà inscrit ? Connectez-vous
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
