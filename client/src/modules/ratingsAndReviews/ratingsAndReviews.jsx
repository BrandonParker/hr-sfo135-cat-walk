import React from 'react';
import ProductAverages from './productAverages.jsx';
import ReviewList from './reviewList.jsx';
import axios from 'axios';
import style from './relatedCSS/ratingsAndReviews.module.css';

class RatingsAndReviews extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      productReviews: undefined,
      openPortal: false,
      reviewsToRender: 0,
      characteristics: {}
    };
    this.toggleNewReviewForm = this.toggleNewReviewForm.bind(this);
    this.showMoreReviewsButtonPressed = this.showMoreReviewsButtonPressed.bind(this);
    this.submitReview = this.submitReview.bind(this);
  }

  toggleNewReviewForm() {
    this.setState({openPortal: !this.state.openPortal});
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/reviews/meta/${this.props.product_id}`)
    .then((response) => {
      this.setState({characteristics: response.data.characteristics})

      axios.get(`http://localhost:3001/reviews/${this.props.product_id}`)
      .then((response) => {
        this.setState({productReviews: response.data.results})
        if (response.data.results.length > 1) {
          this.setState({reviewsToRender: 2})
        } else {
          this.setState({reviewToRender: response.data.results.length})
        }
      })
      .catch(console.error)

    })
    .catch(console.error)
  }

  submitReview(bodyParameters) {
    bodyParameters.product_id = this.props.product_id;
    console.log(bodyParameters);
    axios({
      method: 'post',
      url: 'http://localhost:3001/reviews',
      data: bodyParameters
    })
    .then((response) => console.log(response.data))
    .catch(console.error)
  }

  showMoreReviewsButtonPressed() {
    this.setState({reviewsToRender: this.state.reviewsToRender + 2})
  }

  render() {
    // console.log(this.state);
    if (this.state.productReviews) {
      return (
        <div className={style.RatingsAndReviews}>
          <ProductAverages/>
          <ReviewList
            list={this.state}
            openPortal={this.state.openPortal}
            product_id={this.props.product_id}
            toggleNewReviewForm={this.toggleNewReviewForm}
            pressButton={this.showMoreReviewsButtonPressed}
            submitReview={this.submitReview}
          />
        </div>
      )
    } else {
      return <div>loading..</div>
    }
  }
}

export default RatingsAndReviews;