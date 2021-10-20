import ProgressBar from "../ProgressBar";
import React, { Component, Fragment } from "react";
import Levels from "../Levels";
import { QuizMarvel } from "../quizMarvel";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QuizOver from "../QuizOver";
import { TiChevronRight } from "react-icons/ti";

const initialState = {
  quizLevel: 0,
  maxQuestions: 10,
  storedQuestions: [],
  question: null,
  options: [],
  idQuestion: 0,
  btnDisabled: true,
  userAnswer: null,
  score: 0,
  showWelcomMsg: false,
  quizEnd: false,
  percent: null,
};
const levelNames = ["debutant", "confirme", "expert"];

toast.configure();
class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
    this.storeDataRef = React.createRef();
  }

  loadQuestions = (level) => {
    const feacthArrayQuiz = QuizMarvel[0].quizz[level];
    if (feacthArrayQuiz.length >= this.state.maxQuestions) {
      this.storeDataRef.current = feacthArrayQuiz;
      const newArray = feacthArrayQuiz.map(
        ({ answer, ...keepRest }) => keepRest
      );
      this.setState({ storedQuestions: newArray });
    }
  };
  componentDidMount() {
    this.loadQuestions(levelNames[this.state.quizLevel]);
  }
  nextQuestion = () => {
    if (this.state.idQuestion === this.state.maxQuestions - 1) {
      // END

      this.setState({quizEnd: true,});
    } else {
      this.setState((prevState) => ({idQuestion: prevState.idQuestion + 1,}));
    }
    const goodAnwer = this.storeDataRef.current[this.state.idQuestion].answer;
    if (this.state.userAnswer === goodAnwer) {
      this.setState((prevState) => ({score: prevState.score + 1,}));
      toast.success("BRAVO +1 👌", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        bodyClassName: "toastify-color-success",
      });
    } else {
      toast.error("Raté ! 💩 ", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        bodyClassName: "toastify-color-error",
      });
    }
  };
  componentDidUpdate(prevProps, prevState) {
    const {
      maxQuestions,
      storedQuestions,
      idQuestion,
      score,
      quizEnd,
    } = this.state;
    if (
      storedQuestions !== prevState.storedQuestions &&
      storedQuestions.length
    ) {
      this.setState({
        question: storedQuestions[idQuestion].question,
        options: storedQuestions[idQuestion].options,
      });
    }
    if (
      idQuestion !== prevState.idQuestion &&
      storedQuestions.length
    ) {
      this.setState({
        question: storedQuestions[idQuestion].question,
        options: storedQuestions[idQuestion].options,
        btnDisabled: true,
        userAnswer: null,
      });
    }
    if (quizEnd !== prevState.quizEnd) {
      const gradepercent = this.getPercentage(
        maxQuestions,
        score
      );
      this.gameOver(gradepercent);
    }
    if (this.props.userData.pseudo !== prevProps.userData.pseudo) {
      this.showToastMsg(this.props.userData.pseudo);
    }
  }
  showToastMsg = (pseudo) => {
    if (!this.state.showWelcomMsg) {
      this.setState({showWelcomMsg: true,});
      toast(`Welcome ${pseudo}, et bonne chance ! `, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        bodyClassName: "toastify-color-welcome",
      });
    }
  };
  submitAnswer = (selectedOption) => {
    this.setState({
      userAnswer: selectedOption,
      btnDisabled: false,
    });
  };

  getPercentage = (maxQuest, ourScore) => (ourScore / maxQuest) * 100;
  gameOver = (percent) => {
    if (percent >= 50) {
      this.setState({
        quizLevel: this.state.quizLevel + 1,
        percent,
      });
    } else {
      this.setState({ percent });
    }
  };
  loadLevelQuestions = (param) => {
    this.setState({ ...initialState, quizLevel: param });
    this.loadQuestions(levelNames[param]);
  };
  
  render() {
    const {
      quizLevel,
      maxQuestions,
      question,
      options,
      idQuestion,
      btnDisabled,
      userAnswer,
      score,
      quizEnd,
      percent,
    } = this.state;
    const displayOption = options.map((option, index) => {
      return (
        <p
          key={index}
          className={`answerOptions ${userAnswer === option ? "selected" : ""}`}
          onClick={() => this.submitAnswer(option)}
        >
          <TiChevronRight></TiChevronRight>
          {option}
        </p>
      );
    });

    return quizEnd ? (
      <QuizOver
        ref={this.storeDataRef}
        levelNames={levelNames}
        score={score}
        maxQuestions={maxQuestions}
        quizLevel={quizLevel}
        percent={percent}
        loadLevelQuestions={this.loadLevelQuestions}
      ></QuizOver>
    ) : (
      <Fragment>
        <Levels levelNames={levelNames} quizLevel={quizLevel}></Levels>
        <ProgressBar
          idQuestion={idQuestion}
          maxQuestions={maxQuestions}
        ></ProgressBar>
        <h2> {question} </h2>
        {displayOption}
        <button
          disabled={btnDisabled}
          className="btnSubmit"
          onClick={this.nextQuestion}
        >
          {idQuestion < maxQuestions - 1 ? "Suivant" : "Terminer"}
        </button>
      </Fragment>
    );
  }
}

export default Quiz;
