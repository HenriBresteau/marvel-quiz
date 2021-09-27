import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../Firebase";
const Logout = () => {
  const [checked, setChecked] = useState(false);
  const firebase = useContext(FirebaseContext);
  useEffect(() => {
    if (checked) {
      console.log("déconnexion");
      firebase.signoutUser();
    }
  }, [checked, firebase]);

  const handleChange = (e) => {
    setChecked(e.target.checked);
  };
  return (
    <div className="logoutContainer">
      <label className="switch">
        <input type="checkbox" checked={checked} onChange={handleChange} />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default Logout;
