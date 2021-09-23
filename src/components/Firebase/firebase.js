import app from "firebase/app";
import "firebase/auth";

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
  }
  // INSCRIPTION
  signupUser = (email, password) => {
    this.auth.createUserWithEmailandPassword(email, password);
  };
  // CONNEXION
  loginUser = (email, password) => {
    this.auth.signInWithEmailandPassword(email, password);
  };
  // DECONNEXION
  signoutUser = () => {
    this.auth.signOut();
  };
}
export default Firebase;
