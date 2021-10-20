import React, { Fragment, useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../Firebase";
import Loader from "../Loader";
import Logout from "../Logout";
import Quiz from "../Quiz";

const Welcome = (props) => {
  const [userSession, setUserSession] = useState(null);
  const [userData, setUserData] = useState({});

  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    let listener = firebase.auth.onAuthStateChanged((user) => {
      user ? setUserSession(user) : props.history.push("/");
    });
    if (!!userSession) {
      firebase
        .user(userSession.uid)
        .get()
        .then((doc) => {
          if (doc && doc.exists) {
            const myData = doc.data();
            setUserData(myData);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return () => {
      listener();
    };
  }, [firebase, props, userSession]);
  return userSession === null ? (
    <Fragment>
      <Loader
        loadingMsg="Authentification ..."
        styling={{ textAlign: "center", color: "white" }}
      ></Loader>
    </Fragment>
  ) : (
    <div className="quiz-bg">
      <div className="container">
        <Logout></Logout>
        <Quiz userData={userData}></Quiz>
      </div>
    </div>
  );
};

export default Welcome;
