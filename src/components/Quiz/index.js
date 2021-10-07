import ProgressBar from "../ProgressBar";
import React, { Component } from "react";
import Levels from "../Levels";
import { QuizMarvel } from "../quizMarvel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
class Quiz extends Component {
  state = {
    levelNames: ["debutant", "confirme", "expert"],
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
  };
  storeDataRef = React.createRef();

  loadQuestions = (level) => {
    const feacthArrayQuiz = QuizMarvel[0].quizz[level];
    if (feacthArrayQuiz.length >= this.state.maxQuestions) {
      this.storeDataRef.current = feacthArrayQuiz;
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
  nextQuestion = () => {
    if (this.state.idQuestion === this.state.maxQuestions - 1) {
      // END
    } else {
      this.setState((prevState) => ({
        idQuestion: prevState.idQuestion + 1,
      }));
    }
    const goodAnwer = this.storeDataRef.current[this.state.idQuestion].answer;
    if (this.state.userAnswer === goodAnwer) {
      this.setState((prevState) => ({
        score: prevState.score + 1,
      }));
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
    if (this.state.storedQuestions !== prevState.storedQuestions) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options,
      });
    }
    if (this.state.idQuestion !== prevState.idQuestion) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options,
        btnDisabled: true,
        userAnswer: null,
      });
    }
    if (this.props.userData.pseudo) {
      this.showWelcomeMsg(this.props.userData.pseudo);
    }
  }
  showWelcomeMsg = (pseudo) => {
    if (!this.state.showWelcomMsg) {
      this.setState({
        showWelcomMsg: true,
      });
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
  render() {
    const { pseudo } = this.props.userData;
    const displayOption = this.state.options.map((option, index) => {
      return (
        <p
          key={index}
          className={`answerOptions ${
            this.state.userAnswer === option ? "selected" : ""
          }`}
          onClick={() => this.submitAnswer(option)}
        >
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
        <button
          disabled={this.state.btnDisabled}
          className="btnSubmit"
          onClick={this.nextQuestion}
        >
          Suivant
        </button>
      </div>
    );
  }
}

export default Quiz;
