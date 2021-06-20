import React from 'react';
import style from './QA_CSS/modal.module.css';

const Modal = (props) => {

  var answer = props.answer || false;

  return (
    <div className={style.popup}>
      {/* <div className={style.close} onClick={props.handleClose}>x</div> */}
      <div className={style.box}>
        <div className={style.close} onClick={props.handleClose}>x</div>
        {/* {props.content} */}

        <div className={style.content}>
          <h3>{(answer) ? 'Submit Your Answer' : 'Ask Your Question'}</h3>
          <h4>{answer ? `Camo Onesie: ${props.question_body}` : 'About the Camo Onesie'}</h4>
          <form onSubmit={props.handleSubmit} className={style.form} id="form">

              <div className={style.formelement}>
                <label>{answer ? 'Your Answer: ' : 'Your Question: '}<em><small>(Required)</small></em></label>
                <textarea id="body" type="text" maxLength="10" className="textarea" required="required"></textarea>
              </div>

              <div className={style.formelement}>
                <label>Your Nickname: <em><small>{answer ? '(Required)' : '(Optional)'}</small></em></label>
                <input id="name" type="text" placeholder={answer ? "Example: jack543!" : "Example: jackson11!"} maxLength="5"></input>
                <em><small>For privacy reasons, do not use your full name or email address</small></em>
              </div>

              <div className={style.formelement}>
                  <label>Your Email: <em><small>(Required)</small></em></label>
                  <input id="email" type="email" placeholder="Example: jack@email.com" maxLength="20" required="required"></input>
                  <em><small>For authentication reasons, you will not be emailed</small></em>
              </div>

              <button className={style.modalsubmit}>Submit</button>
            </form>
        </div>

      </div>
    </div>
  );
};

export default Modal;