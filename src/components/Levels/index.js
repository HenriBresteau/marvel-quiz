import React, { useEffect, useState } from "react";
import Stepper from "react-stepper-horizontal";
const Levels = ({ levelNames, quizLevel }) => {
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    const quizSteps = levelNames.map((lvl) => ({ title: lvl.toUpperCase() }));
    setLevels(quizSteps);
  }, [levelNames]);
  return (
    <div className="levelsContainer" style={{ background: "transparent" }}>
      <Stepper
        steps={levels}
        activeStep={quizLevel}
        circleTop={0}
        activeTitleColor={"#d31017"}
        activeColor={"#eb1d27"}
        completeTitleColor={"#e0e0e0"}
        completeColor={"#e0e0e0"}
        completeBarColor={"#e0e0e0"}
        defaultTitleColor={"#e0e0e0"}
        barStyle={"dashed"}
        size={46}
        circleFontSize={20}
      />
    </div>
  );
};

export default React.memo(Levels);
