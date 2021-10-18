import React, { Fragment } from "react";

const ProgressBar = ({ idQuestion, maxQuestions }) => {
  const acutalQuestion = idQuestion + 1;
  const getPercent = (totalQuestions, questionId) => {
    return (100 / totalQuestions) * questionId;
  };
  const progressPercent = getPercent(maxQuestions, acutalQuestion);
  return (
    <Fragment>
      <div className="percentage">
        <div className="progressPercent">
          {`Question : ${acutalQuestion} / ${maxQuestions} `}
        </div>
        <div className="progressPercent">
          {`Progression : ${progressPercent} %`}
        </div>
      </div>
      <div className="progressBar">
        <div
          className="progressBarChange"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
    </Fragment>
  );
};

export default React.memo(ProgressBar);
