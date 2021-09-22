import React, { useRef, useEffect, useState, Fragment } from "react";

const Landing = () => {
  const [btn, setBtn] = useState(false);
  console.log("🚀 ~ file: index.js ~ line 5 ~ Landing ~ btn", btn);
  const refWolferine = useRef(null);

  useEffect(() => {
    refWolferine.current.classList.add("startingImg");
    setTimeout(() => {
      refWolferine.current.classList.remove("startingImg");
      setBtn(true);
    }, 1000);
  }, []);

  const displayBtn = btn && (
    <Fragment>
      <div className="leftBox">
        <button className="btn-welcome">Inscription</button>
      </div>
      <div className="rightBox">
        <button className="btn-welcome">Connexion</button>
      </div>
    </Fragment>
  );
  return (
    <main ref={refWolferine} className="welcomePage">
      {displayBtn}
    </main>
  );
};

export default Landing;
