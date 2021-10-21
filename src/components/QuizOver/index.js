import React, { useEffect, useState } from "react";
import { Fragment } from "react/cjs/react.production.min";

import { GiTrophyCup } from "react-icons/gi";
import Loader from "../Loader";
import Modal from "../Modal";
import axios from "axios";

const QuizOver = React.forwardRef((props, ref) => {
  const {
    levelNames,
    score,
    maxQuestions,
    quizLevel,
    percent,
    loadLevelQuestions,
  } = props;

  const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY;
  const hash = "91de7a537079e3f94bffc4bf3d718e42";

  const [asked, setAsked] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [charaterData, setCharaterData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setAsked(ref.current);
    if (localStorage.getItem("marvelStorageDate")) {
      const date = localStorage.getItem("marvelStorageDate");
      checkDataAge(date);
    }
  }, [ref]);

  const checkDataAge = (date) => {
    const today = Date.now();
    const timeDifference = today - date;
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    if (daysDifference >= 15) {
      localStorage.clear();
      localStorage.setItem("marvelStorageDate", Date.now());
    }
  };

  const showModal = (id) => {
    setOpenModal(true);
    if (localStorage.getItem(id)) {
      setCharaterData(JSON.parse(localStorage.getItem(id)));
      setIsLoading(false);
    } else {
      axios
        .get(
          `https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${hash}`
        )
        .then((result) => {
          setCharaterData(result.data);
          setIsLoading(false);
          localStorage.setItem(id, JSON.stringify(result.data));
          if (!localStorage.getItem("marvelStorageDate")) {
            localStorage.setItem("marvelStorageDate", Date.now());
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const hideModal = () => {
    setOpenModal(false);
    setIsLoading(true);
  };

  const avgGrade = maxQuestions / 2;
  if (score < avgGrade) {
    // setTimeout(() => loadLevelQuestions(0), 3000);
    setTimeout(() => loadLevelQuestions(quizLevel), 3000);
  }
  const decision =
    score >= avgGrade ? (
      <Fragment>
        <div className="stepsBtnContainer">
          {quizLevel < levelNames.length ? (
            <Fragment>
              <p className="successMsg">Bravo, passez au niveau suivant !</p>
              <button
                className="btnResult success"
                onClick={() => loadLevelQuestions(quizLevel)}
              >
                Niveau Suivant
              </button>
            </Fragment>
          ) : (
            <Fragment>
              <p className="successMsg">
                <GiTrophyCup size="50px"></GiTrophyCup> Bravo, vous êtes un
                expert !
              </p>
              <button
                className="btnResult gameOver"
                onClick={() => loadLevelQuestions(0)}
              >
                Accueil
              </button>
            </Fragment>
          )}
        </div>
        <div className="percentage">
          <div className="progressPercent">Réussite : {percent}%</div>
          <div className="progressPercent">
            Note : {score}/{maxQuestions}
          </div>
        </div>
      </Fragment>
    ) : (
      <Fragment>
        <div className="stepsBtnContainer">
          <p className="failureMsg">Vous avez échoué !</p>
        </div>
        <div className="percentage">
          <div className="progressPercent">Réussite : {percent}%</div>
          <div className="progressPercent">
            Note : {score}/{maxQuestions}
          </div>
        </div>
      </Fragment>
    );

  const questionAnswer =
    score >= avgGrade ? (
      asked.map((question) => {
        return (
          <tr key={question.id}>
            <td> {question.question} </td>
            <td> {question.answer} </td>
            <td>
              <button
                className="btnInfo"
                onClick={() => showModal(question.heroId)}
              >
                Infos
              </button>
            </td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td colSpan="3">
          <Loader
            loadingMsg="pas de réponse"
            styling={{ textAlign: "center", color: "red" }}
          ></Loader>
        </td>
      </tr>
    );
  const resultInModal = !isLoading ? (
    <Fragment>
      <div className="modalHeader">
        <h2>{charaterData.data.results[0].name}</h2>
      </div>
      <div className="modalBody">
        <h3>Content</h3>
      </div>
      <div className="modalFooter">
        <button className="modalBtn">Femer</button>
      </div>
    </Fragment>
  ) : (
    <Fragment>
      <div className="modalHeader">
        <h2>Réponse de Marvel ...</h2>
      </div>
      <div className="modalBody">
        <Loader loadingMsg="Chargement..."></Loader>
      </div>
    </Fragment>
  );
  return (
    <Fragment>
      {decision}
      <hr />
      <p>Les réponses aux questions posées: </p>
      <div className="answerContainer">
        <table className="answers">
          <thead>
            <tr>
              <th>Question</th>
              <th>Réponses</th>
              <th>Infos</th>
            </tr>
          </thead>
          <tbody>{questionAnswer}</tbody>
        </table>
      </div>
      <Modal showModal={openModal} hideModal={hideModal}>
        {resultInModal}
      </Modal>
    </Fragment>
  );
});

export default React.memo(QuizOver);
