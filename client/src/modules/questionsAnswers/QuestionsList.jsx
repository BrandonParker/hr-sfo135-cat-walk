import React from 'react';
import QuestionItem from './QuestionItem.jsx';
import style from './QA_CSS/questionsList.module.css';

const QuestionsList = (props) => {
  return (
    <>
      <div className={style.questionlist}>
        {props.questions.map((question, index) => {
          return <QuestionItem QA={question} key={index} product_id={props.product_id}/>
        })}
      </div>
    </>
  )
}

export default QuestionsList;