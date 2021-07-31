import React, { useEffect, useState } from 'react';
import ProductAverages from './productAverages.jsx';
import ReviewList from './reviewList.jsx';
import axios from 'axios';
import style from './relatedCSS/ratingsAndReviews.module.css';

class RatingsAndReviews extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      productReviews: undefined,
      meta: undefined,
      openPortal: false,
      reviewsToRender: 0,
    };
    // this.mounted = false;
    this.toggleNewReviewForm = this.toggleNewReviewForm.bind(this);
    this.showMoreReviewsButtonPressed = this.showMoreReviewsButtonPressed.bind(this);
    this.submitReview = this.submitReview.bind(this);
    this.showLessReviewsButtonPressed = this.showLessReviewsButtonPressed.bind(this);
  }

  toggleNewReviewForm() {
    this.setState({openPortal: !this.state.openPortal});
  }


  // componentWillUnmount() {
  //   this.mounted = false;
  //   axios.Cancel()
  // }

  // async handleAsync() {
  //   const result = await axios.get(`http://localhost:3132/reviews/meta/${this.props.product_id}`);
  // }

  componentDidMount() {
    // this.mounted = true
    // const newFunc = async () => {

    //   try{
    //     const metaData = await axios.get()
    //   } catch(e) {
    //     console.log(e)
    //   }

    // }
    axios.get(`http://localhost:3132/reviews/meta/${this.props.product_id}`)
    .then((response) => {
      console.log('meta data', response.data);
      this.setState({meta: response.data});
    })
    .then(() => {
      return axios.get(`http://localhost:3132/reviews/${this.props.product_id}`)
    })
    .then((response) => {
      this.setState({productReviews: response.data.results})
      console.log('reviews', response.data.results)
      if (response.data.results.length > 1) {
        this.setState({reviewsToRender: 2})
      } else {
        this.setState({reviewToRender: response.data.results.length})
      }
    })
    .catch(console.error)
  }

  submitReview(bodyParameters) {
    bodyParameters.product_id = this.props.product_id;
    axios({
      method: 'post',
      url: 'http://localhost:3001/reviews',
      data: bodyParameters
    })
    .then((response) => console.log(response.data))
    .catch(console.error)
  }

  showMoreReviewsButtonPressed() {
    this.setState({reviewsToRender: this.state.productReviews.length})
  }

  showLessReviewsButtonPressed() {
    if (this.state.productReviews.length > 1) {
      this.setState({reviewsToRender: 2})
    } else {
      this.setState({reviewToRender: this.state.productReviews.length})
    }
  }

  render(){
    if(!this.state.productReviews){ 
      return <div>loading...</div>
    }

    console.log('meta', this.state.meta);
    console.log('reviews', this.state.productReviews);
    return (
      <div className={style.RatingsAndReviews}>
        <ProductAverages list={this.state}/>
        <ReviewList
          list={this.state}
          openPortal={this.state.openPortal}
          product_id={this.props.product_id}
          toggleNewReviewForm={this.toggleNewReviewForm}
          showMoreReviewsButtonPressed={this.showMoreReviewsButtonPressed}
          showLessReviewsButtonPressed={this.showLessReviewsButtonPressed}
          submitReview={this.submitReview}
        />
      </div>
    )
  }
}

// const RatingsAndReviews = ({product_id}) => {

//   const [productReview, setProductReview] = useState(undefined);
//   const [meta, setMeta] = useState(undefined);
//   const [openPortal, setOpenPortal] = useState(undefined);
//   const [reviewsToRender, setReviewsToRender] = useState(0);


//   useEffect = (() => {
//     axios.get(`http://localhost:3001/reviews/meta/${product_id}`)
//     .then((response) => {
//       console.log('meta data', response.data);
//       setMeta(response.data)
//     })
//     .then(() => {
//       return axios.get(`http://localhost:3001/reviews/${product_id}`)
//     })
//     .then((response) => {
//       setProductReview(response.data.results)
//       console.log('reviews', response.data.results)
//       reviewsToRender(response.data.results.length > 1 ? 2 : response.data.results.length)
//     })
//     .catch(console.error)
//   }, [])

//   function submitReview(bodyParameters) {
//     bodyParameters.product_id = product_id;
//     axios({
//       method: 'post',
//       url: 'http://localhost:3001/reviews',
//       data: bodyParameters
//     })
//     .then((response) => console.log(response.data))
//     .catch(console.error)
//   }

//   if(!productReview){ 
//     return <div>loading...</div>
//   }

//   const product = {
//     productReview, meta, openPortal, reviewsToRender
//   }

//   console.log('meta', meta);
//   console.log('reviews', productReviews);
//   return (
//     <div className={style.RatingsAndReviews}>
//       <ProductAverages list={product}/>
//       <ReviewList
//         list={product}
//         openPortal={openPortal}
//         product_id={product_id}
//         toggleNewReviewForm={() => setOpenPortal(!openPortal)}
//         showMoreReviewsButtonPressed={() => setReviewsToRender(productReview.length)}
//         showLessReviewsButtonPressed={() => setReviewsToRender(productReview.length > 1 ? 2 : productReview.length)}
//         submitReview={submitReview}
//       />
//     </div>
//   )
// }

export default RatingsAndReviews;