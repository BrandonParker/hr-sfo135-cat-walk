import React from 'react';
import style from './ProductCSS.module.css';

class ProductOverview extends React.Component {
    constructor() {
      super();
    }

  render() {
    return (
      <div className={style.wrapper}>
        <div className={style.overview}>
          <img src={this.props.product.productPhotos[1].thumbnail_url} className={style.img}></img>
          <h1>{this.props.product.productDetails[1]}</h1>
          <span>{this.props.product.productDetails[3]}</span>
        </div>
      </div>
    )
  }
}

export default ProductOverview;