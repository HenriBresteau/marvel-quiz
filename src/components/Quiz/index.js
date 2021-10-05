import ProgressBar from "../ProgressBar";
import React, { Component } from "react";
import Levels from "../Levels";

class Quiz extends Component {
  render() {
    const { pseudo } = this.props.userData;
    return (
      <div>
        <h2>Bonjour {pseudo} </h2>
        <Levels></Levels>
        <ProgressBar></ProgressBar>
        <h2>Notre question Quiz</h2>
        <p className="answerOptions">Question 1</p>
        <p className="answerOptions">Question 2</p>
        <p className="answerOptions">Question 3</p>
        <p className="answerOptions">Question 4</p>
        <button className="btnSubmit">Suivant</button>
      </div>
    );
  }
}

export default Quiz;
