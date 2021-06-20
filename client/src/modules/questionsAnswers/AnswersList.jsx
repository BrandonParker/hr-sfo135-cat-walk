import React, { useState, useEffect } from 'react';
import AnswerItem from './AnswerItem.jsx';
import axios from 'axios';
import style from './QA_CSS/answersList.module.css';

const AnswersList = (props) => {
  const [visibleAnswers, setVisibleAnswers] = useState([]);
  const [allAnswers, setAllAnswers] = useState([]);
  const [buttonExpand, setButtonExpand] = useState(true);
  const [fetchDone, setFetchDone] = useState(false);
  const [nextPage, setNextPage] = useState(1);

  var max = 5;
  var initialCount = 2;

  useEffect(() => {
    if (!fetchDone) {
        getAnswers(true);
    }
  }, [allAnswers])

  useEffect(() => {
    setFetchDone(false);
    setNextPage(1);
    setVisibleAnswers([]);
    setAllAnswers([]);
  }, [props.question_id])

  var handleLoadAnswersClick = () => {
    if (buttonExpand) {
      setButtonExpand(false);

      while(!fetchDone) {
        useEffect(() => {
          setVisibleAnswers(allAnswers);
        }, [allAnswers])
      }
      setVisibleAnswers(allAnswers);
    } else {
      setButtonExpand(true);
      setVisibleAnswers(allAnswers.slice(0, initialCount));
    }
  }

  var getAnswers = () => {
    const option = {
      'method': 'GET',
      'url': `/qa/questions/${props.question_id}/answers/${nextPage}/${max}`
    }
    axios(option)
      .then(response => {
        setFetchDone(max > response.data.length);
        setNextPage(nextPage + 1);

        if (visibleAnswers.length === 0) {
          setVisibleAnswers(response.data.slice(0, initialCount));
          setButtonExpand(initialCount < response.data.length);
        }

        setAllAnswers(allAnswers.concat(response.data));
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div className={style.answersbox}>
      <div><strong>A: </strong></div>

      <div className={style.wrapper}>
        <div className={style.answerslist}>
          {visibleAnswers.map((answer, index) => {
            return <AnswerItem answer={answer} key={index}/>
          })}
        </div>

        {(allAnswers.length > 2) ? <button className={style.answerloadbutton} onClick={handleLoadAnswersClick}>{(buttonExpand) ? 'LOAD MORE ANSWERS' : 'COLLAPSE ANSWERS'}</button> : <></>}
      </div>

    </div>
  )
}

export default AnswersList;