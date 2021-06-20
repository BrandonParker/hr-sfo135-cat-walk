import React, {Suspense} from 'react';
import Axios from 'axios';
import ProductOverview from '../modules/ProductOverview/ProductOverview.jsx';
//import Related from '../modules/RelatedProducts/RelatedProductsYourOutfit.jsx';
import RelatedSample from '../modules/RelatedProducts/SampleRelated.js';
//import RatingsAndReviews from '../modules/ratingsAndReviews/ratingsAndReviews.jsx';
//import QuestionsAndAnswers from '../modules/questionsAnswers/QA.jsx';
import style from './AppCss.module.css';
const Related = React.lazy(() => import('../modules/RelatedProducts/RelatedProductsYourOutfit.jsx'));
const RatingsAndReviews = React.lazy(() => import('../modules/ratingsAndReviews/ratingsAndReviews.jsx'));
const QuestionsAndAnswers = React.lazy(() => import('../modules/questionsAnswers/QA.jsx'));
import Load from './Loading.jsx';

class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      currentProduct: RelatedSample
    }
    this.cardClick = this.cardClick.bind(this);
  }

  cardClick (product) {
    const id = product.productDetails[0];
    const option = {
      "method": 'get',
      "url": `/currentProduct/${id}`,
      "params": {
        ID: id
      }
    }
    Axios(option)
      .then(response => {
        this.setState({currentProduct: {
          productDetails: response.data[0],
          productPhotos: response.data[1],
          ratings: response.data[2]
        }});
      })
      .catch(err => {
        console.log(err);
      })
  }

  render () {
    return (
      <div className={style.productPage}>
        <ProductOverview product={this.state.currentProduct}/>
        <Suspense fallback={<Load />}>
          <Related currentProduct={this.state.currentProduct} cardClick={this.cardClick}/>
          <QuestionsAndAnswers product_id={25167}/>
          <RatingsAndReviews product_id={25167}/>
        </Suspense>
      </div>
    );
  }
}

export default App;