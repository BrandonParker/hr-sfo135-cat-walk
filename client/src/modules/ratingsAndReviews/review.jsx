import React from 'react';

class Review extends React.Component {
  constructor(props) {
    super(props)
    this.state = {};
  }

  render() {
    const review = this.props.currentReview;
    console.log('review 123 ', review.summary);
    return (
      <div className="review">
        <div className="reviewGroup1">
          <div className="reviewRating">{`${review.rating} stars`}</div>
          <div className="reviewUsername">{'username: ' + review.username}</div>
          <div className="reviewDate">{review.date}</div>
        </div>
        <div className="reviewSummary">{review.summary}</div>
        <div className="reviewBody">{review.body}</div>
        <div className="reviewRecommend">{'recommended: ' + review.recommend}</div>
        <div className="reviewResponse">{'sales response: ' + review.response}</div>
      </div>
    )
  }
}

export default Review;