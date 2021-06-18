import React from 'react';
import ReactDOM from 'react-dom';

const NewReviewFormCharacteristic = function (props) {
  return (
    <div>
      <label>
        {props.characteristic}
        <br></br>
        {
          [1,2,3,4,5].map((rating) => {
            return (
              <span key={props.characteristic + rating}>
                <label>{rating}</label>
                <input type="radio" name={props.characteristic} onChange={() => props.handleCharacteristicRating(props.id, rating)} value={rating}></input>
              </span>
            )
          })
        }
      </label>
    </div>
  )
}

export default NewReviewFormCharacteristic;