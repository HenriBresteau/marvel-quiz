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
  const setLeftImg = () => {
    refWolferine.current.classList.add("leftImg");
  };
  const setRightImg = () => {
    refWolferine.current.classList.add("rightImg");
  };
  const clearImg = () => {
    if (refWolferine.current.classList.contains("leftImg")) {
      refWolferine.current.classList.remove("leftImg");
    } else if (refWolferine.current.classList.contains("rightImg")) {
      refWolferine.current.classList.remove("rightImg");
    }
  };
  const displayBtn = btn && (
    <Fragment>
      <div className="leftBox" onMouseOver={setLeftImg} onMouseOut={clearImg}>
        <button className="btn-welcome">Inscription</button>
      </div>
      <div className="rightBox" onMouseOver={setRightImg} onMouseOut={clearImg}>
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
