import ProgressBar from "../ProgressBar";
import React, { Component } from "react";
import Levels from "../Levels";
import { QuizMarvel } from "../quizMarvel";

class Quiz extends Component {
  state = {
    levelNames: ["debutant", "confirme", "expert"],
    quizLevel: 0,
    maxQuestions: 10,
    storedQuestions: [],
    question: null,
    options: [],
    idQuestion: 0,
  };

  loadQuestions = (level) => {
    const feacthArrayQuiz = QuizMarvel[0].quizz[level];
    if (feacthArrayQuiz.length >= this.state.maxQuestions) {
      const newArray = feacthArrayQuiz.map(
        ({ answer, ...keepRest }) => keepRest
      );
      this.setState({ storedQuestions: newArray });
    } else {
      console.log("pas assez de questions");
    }
  };
  componentDidMount() {
    this.loadQuestions(this.state.levelNames[this.state.quizLevel]);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.storedQuestions !== prevState.storedQuestions) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options,
      });
    }
  }
  render() {
    const { pseudo } = this.props.userData;
    const displayOption = this.state.options.map((option, index) => {
      return (
        <p key={index} className="answerOptions">
          {option}
        </p>
      );
    });
    return (
      <div>
        <h2>Bonjour {pseudo} </h2>
        <Levels></Levels>
        <ProgressBar></ProgressBar>
        <h2> {this.state.question} </h2>
        {displayOption}
        <button className="btnSubmit">Suivant</button>
      </div>
    );
  }
}

export default Quiz;
