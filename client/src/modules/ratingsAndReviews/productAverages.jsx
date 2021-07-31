import React from 'react';
import style from './relatedCSS/productAverages.modules.css';

// class ProductAverages extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//     };
//   }

//   render () {
//     if (this.props.list.productReviews) {
//       const ratingsArray = this.props.list.productReviews.map(review => review.rating);
//       const averageRating = ratingsArray.map((rating) => Number.parseInt(rating)).reduce((total, next) => total + next) / ratingsArray.length;
//       const stars = new Array
//       return (
//         <div className={style.averages}>
//           <h2>RATINGS & REVIEWS</h2>
//           <div className={style.averageRating}>{averageRating.toString().substring(0, 3)}</div>
//         </div>
//       )
//     }
//   }
// }
//style={`--averageRating: ${averageRating}`}

const ProductAverages = function (props) {
  console.log(props);
  if (props.list.productReviews) {
    //look into creating a star component
    const stars = new Array(5).fill('').map((empty, index) => <div key={`starAverage${index}`} className={style.averageStar}>&#9734;</div>);
    const ratingsArray = props.list.productReviews.map(review => review.rating);
    const averageRating = ratingsArray.map((rating) => Number.parseInt(rating)).reduce((total, next) => total + next) / ratingsArray.length;
    const averagePercentage = Math.round(averageRating * 100) / 5;
    console.log(averagePercentage);
    const percentageRecommended = 100 * (props.list.productReviews.map(({recommend}) => (+recommend)).reduce((total, next) => total + next) / ratingsArray.length);
    console.log('array recommend ', percentageRecommended);
    const characteristicsArray = Object.keys(props.list.meta.characteristics).map((characteristic) => {
      return (
        <div key={`characteristic${characteristic}`}>
          <h6 className={style.characteristics} >{characteristic}</h6>
          <div className={style[`${characteristic}AverageBar`]}></div>
        </div>
      )
    })
    //&#11240;
    console.log(characteristicsArray);
    return (
      <div className={style.averages}>
        <h2 className={style.averageTitle}>RATINGS & REVIEWS</h2>
        <div className={style.averageRating}>{Math.round(averageRating * 10) / 10}</div>
        {/* <div className={style.averageStarsFill}>{stars}</div> */}
        <div className={style.averageStarsFill}>
          <div className={style.averageStar}>&#9733;</div>
          <div className={style.averageStar}>&#9733;</div>
          <div className={style.averageStar}>&#9733;</div>
          <div className={style.averageStar}>&#9733;</div>
          <div className={style.averageStar}>&#9734;</div>
        </div>
        <div className={style.percentageRecommended}>{`${percentageRecommended}% of reviews recommend this product`}</div>
        <div className={style.starNumbers}>5 stars<div className={style.fiveStars}></div></div>
        <div className={style.starNumbers}>4 stars<div className={style.fourStars}></div></div>
        <div className={style.starNumbers}>3 stars<div className={style.threeStars}></div></div>
        <div className={style.starNumbers}>2 stars<div className={style.twoStars}></div></div>
        <div className={style.starNumbers}>1 stars<div className={style.oneStars}></div></div>
        {characteristicsArray}
      </div>
    )
  }
}



export default ProductAverages;