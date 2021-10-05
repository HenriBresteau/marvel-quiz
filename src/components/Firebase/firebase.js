import app from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// import { doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAgkLrTvqV8JwGI8nt5tB-7bSfdesaGHeE",
  authDomain: "marvel-quiz-d4afb.firebaseapp.com",
  projectId: "marvel-quiz-d4afb",
  storageBucket: "marvel-quiz-d4afb.appspot.com",
  messagingSenderId: "997523126669",
  appId: "1:997523126669:web:b48148dab68628dc6aa5c4",
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.firestore();
  }
  // INSCRIPTION
  signupUser = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
  // CONNEXION
  loginUser = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
  // DECONNEXION
  signoutUser = () => this.auth.signOut();

  // Récupere le mot de passe
  passwordReset = (email) => this.auth.sendPasswordResetEmail(email);

  //
  user = (uid) => this.db.doc(`users/${uid}`);
}
export default Firebase;
