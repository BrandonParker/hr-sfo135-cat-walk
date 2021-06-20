import React,  { useState } from 'react';
import axios from 'axios';
import style from './QA_CSS/answerItem.module.css';

const Answer = (props) => {
  const [wasHelpful, setWasHelpful] = useState(false);
  const[wasReported, setWasReported] = useState(false);
  const[helpfulness, setHelpfulness] = useState(props.answer.helpfulness);

  var getFormattedDate = () => {
    var date = new Date(props.answer.date);

    var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getMonth()];
    var day = date.getDate();
    var year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  }

  var handleAnswerHelpfulButton = () => {
    if (!wasHelpful) {
      axiosHelpful();
    }
  }

  var handleAnswerReportButton= () => {
    if (!wasReported) {
      axiosReport();
    }
  }

  var axiosHelpful = () => {
    const option = {
      'method': 'PUT',
      'url': `/qa/answers/${props.answer.answer_id}/helpful`
    }
    axios(option)
    .then(response => {
      setHelpfulness(helpfulness + 1);
      setWasHelpful(true);
    })
    .catch(err => {console.log(err);})
  }

  var axiosReport = () => {
    const option = {
      'method': 'PUT',
      'url': `/qa/answers/${props.answer.answer_id}/report`
    }
    axios(option)
    .then(response => {
      setWasReported(true);
    })
    .catch(err => {console.log(err);})
  }

  var username = (props.answer.answerer_name === 'Seller') ? <b>Seller</b> : <>{props.answer.answerer_name}</>;

  // var helpfulbutton = (wasHelpful) ? <span className={style.checked}>&#10003;</span> : <u>Yes</u>;

  return (
    <div className={style.answer}>
      <div className={style.answertext}>{props.answer.body}</div>



      {/* {console.log('answer: ', props.answer.photos)} */}
        {(props.answer.photos.length !== 0) ?
           <div className={style.pictures}>
            {(props.answer.photos.map(photo =>
              <img src={photo.url} alt="Answer Image" key={photo.id}></img>)
            )}
          </div> : <></>
      }


      <div className={style.answerinfo}>
          <span className={style.answeruser}>{`by `}{username}{`, ${getFormattedDate()}`}</span>

          <span className={style.divider}>|</span>

          {/* <span className={style.answerhelpful}>{`Helpful? `}<button className={style.helpfulbutton} onClick={handleAnswerHelpfulButton}>{helpfulbutton}</button>{` (${helpfulness})`}</span> */}

          <span>Helpful? </span>

          {(!wasHelpful) ? <button className={style.helpfulbutton} onClick={handleAnswerHelpfulButton}><u>Yes</u></button> : <span style={{color: "green"}}>&#10003;</span>}

          <span>{` (${helpfulness}) `}</span>

          <span className={style.divider}>|</span>
{/*
          <button className={style.reportbutton} onClick={handleAnswerReportButton}><u>{(wasReported) ? 'Reported' : 'Report'}</u></button> */}

          {(!wasReported) ? <button className={style.reportbutton} onClick={handleAnswerReportButton}><u>Report</u></button> : <span style={{color: "red"}}><u>Reported</u></span>}

      </div>
    </div>
  )
}

export default Answer;