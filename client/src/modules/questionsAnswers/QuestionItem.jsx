import React, { useState, useEffect } from 'react';
import AnswersList from './AnswersList.jsx';
import axios from 'axios';
import Modal from './Modal.jsx';
import style from './QA_CSS/questionItem.module.css';

const QuestionItem = (props) => {
  const [helpfulness, setHelpfulness] = useState(props.QA.question_helpfulness);
  const [wasHelpful, setWasHelpful] = useState(false);
  const [modal, setModal] = useState(false);

  // wasReported = false;

  var answersLength = Object.keys(props.QA.answers).length;

  var modalOpen = () => {
    setModal(true);
  }

  var modalClose = () => {
    setModal(false);
  }

  var handleAddQuestionSubmit = (e) => {
    e.preventDefault(e);

    var body = document.getElementById("body").value;
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;

    axios({
      method: "post",
      url: `/qa/questions/${props.QA.question_id}/answers`,
      data: {
        "body": body,
        "name": name,
        "email": email
      }
    })
    .then(res => {
      console.log(res.status);
      modalClose();
    })
    .catch(err => {console.log(err);})
  }

  var handleQuestionHelpfulButton = () => {
    if (!wasHelpful) {
      axiosHelpful();
    }
  }

  var axiosHelpful = () => {
    const option = {
      'method': 'PUT',
      'url': `/qa/questions/${props.QA.question_id}/helpful`
    }
    axios(option)
    .then(response => {
      setWasHelpful(true);
      setHelpfulness(helpfulness + 1);
    })
    .catch(err => {console.log(err);})
  }

  return (
    <article className={style.question}>

      <div className={style.info}>
        {/* <span className="question-text"><strong>{`Q: ${props.QA.question_body}`}</strong></span> */}

        <span><strong>Q:</strong></span>
        <span className={style.questiontext}><strong>{props.QA.question_body}</strong></span>

        <div className={style.buttons}>
          {/* <span className={style.helpful}>{`Helpful? `}<button className={style.helpfulbutton} onClick={handleQuestionHelpfulButton}><u>Yes</u></button>{` (${helpfulness})`}</span> */}

          <span>Helpful? </span>

          {(!wasHelpful) ? <button className={style.helpfulbutton} onClick={handleQuestionHelpfulButton}><u>Yes</u></button> : <span style={{color: "green"}}>&#10003;</span>}

          <span>{` (${helpfulness}) `}</span>
          <span className={style.divider}>|</span>

          <button className={style.addanswerbutton} onClick={modalOpen}><u>Add Answer</u></button>
        </div>

      </div>

      {(modal) ? <Modal handleSubmit={handleAddQuestionSubmit} handleClose={modalClose} answer={true} question_body={props.QA.question_body}/> : null}

      {(answersLength !== 0) ? <AnswersList question_id={props.QA.question_id}/> : <div></div>}

      {/* <hr></hr> */}

    </article>
    )
}

export default QuestionItem;