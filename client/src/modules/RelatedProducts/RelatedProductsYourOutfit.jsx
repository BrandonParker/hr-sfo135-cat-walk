import React from 'react';
import Axios from 'axios';
import RelatedProducts from './RelatedProducts.jsx';
import YourOutfit from './YourOutfit.jsx';
import style from './RelatedCSS/RelatedOutfit.module.css';
import helpers from './helpers.jsx';

class Related extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      currentProduct: this.props.currentProduct,
      relatedList: [],
      relatedCarosel: [],
      outfitList: [],
      outfitCarosel: [],
      relatedStart: 0,
      relatedEnd: 5,
      outfitStart: 0,
      outfitEnd: 4,
      starClick: false
    }
    this.getRelatedProducts = this.getRelatedProducts.bind(this);
    this.caroselClickLeft = this.caroselClickLeft.bind(this);
    this.caroselClickRight = this.caroselClickRight.bind(this);
    this.addToOutfit = this.addToOutfit.bind(this);
    this.getProductInfo = this.getProductInfo.bind(this);
    this.removeFromOutfit = this.removeFromOutfit.bind(this);
    this.relatedCardClick = this.relatedCardClick.bind(this);
  }

  componentDidMount() {
    const yourOutfit = localStorage.yourOutfit ? JSON.parse(localStorage.yourOutfit) : this.state.outfitList;
    const carosel = helpers.getCaroselProducts(yourOutfit, 0, 4);

    this.getRelatedProducts(this.state.currentProduct.productDetails[0]);
    this.setState({outfitList: yourOutfit, outfitCarosel: carosel});
  }

  relatedCardClick(productCardClicked) {
    this.setState({currentProduct: productCardClicked});
    this.props.cardClick(productCardClicked);
    this.getRelatedProducts(productCardClicked.productDetails[0]);
  }

  caroselClickRight (list) {
    const caroselInfoArray = helpers.caroselBeingClicked(list);
    const start = this.state[caroselInfoArray[2]] + 1;
    const end = this.state[caroselInfoArray[3]] + 1;
    const carosel = this.state[caroselInfoArray[0]].slice(start, end);

    this.setState({[caroselInfoArray[1]]: carosel, [caroselInfoArray[2]]: start, [caroselInfoArray[3]]: end});
  }

  caroselClickLeft (list) {
    const caroselInfoArray = helpers.caroselBeingClicked(list);
    const start = this.state[caroselInfoArray[2]] - 1;
    const end = this.state[caroselInfoArray[3]] - 1;
    const carosel = this.state[caroselInfoArray[0]].slice(start, end);

    this.setState({[caroselInfoArray[1]]: carosel, [caroselInfoArray[2]]: start, [caroselInfoArray[3]]: end});
  }

  addToOutfit (currentProduct) {
    const newOutfit = this.state.outfitList.slice();
    const outfitIds = newOutfit.map(product => {return product.productDetails[0]});

    if (outfitIds.includes(currentProduct.productDetails[0]) === false) {
      newOutfit.push(currentProduct);
      let carosel = helpers.getCaroselProducts(newOutfit, this.state.outfitStart, this.state.outfitEnd);

      this.setState({outfitList: newOutfit, outfitCarosel: carosel});
      localStorage.setItem('yourOutfit', JSON.stringify(newOutfit));
    } else {
      console.log('Already there!');
    }
  }

  removeFromOutfit (outfitCardProduct) {
    const oldOutfit = this.state.outfitList.slice();
    const outfitIds = oldOutfit.map(product => {return product.productDetails[0]});
    const productId = outfitIds.indexOf(outfitCardProduct.productDetails[0]);

    oldOutfit.splice(productId, 1);
    let carosel = helpers.getCaroselProducts(oldOutfit, this.state.outfitStart, this.state.outfitEnd);

    this.setState({outfitList: oldOutfit, outfitCarosel: carosel});
    localStorage.setItem('yourOutfit', JSON.stringify(oldOutfit));
  }

  getRelatedProducts (id) {
    const option = {
      "method": 'get',
      "url": `/related/${id}`,
      "params": {
        ID: id
      }
    }
    Axios(option)
      .then(response => {
        this.getProductInfo(response.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  getProductInfo (relatedIds) {
    const option = {
      "method": 'post',
      "url": `related/productInfo`,
      "data": {
        "products": relatedIds
      }
    }
    Axios(option)
      .then((response) => {
        const relatedObjArr = response.data.map((product) => {
          return {productDetails: product[0], productPhotos: product[1], ratings: product[2]};
        })
        const carosel = relatedObjArr.slice(this.state.start, this.state.end);

        this.setState({relatedList: relatedObjArr, relatedCarosel: carosel});
      })
      .catch(err => {
        console.log(err);
      })
  }

  render () {
    return (
      <div className={style.relatedProducts}>
        <h3 className={style.h3}>Related Products</h3>
        <RelatedProducts
          relatedInfo={this.state}
          products={this.state.relatedCarosel}
          caroselClickRight={this.caroselClickRight}
          caroselClickLeft={this.caroselClickLeft}
          comparison={this.comparisonClick}
          cardClick={this.relatedCardClick}
          list='related'
        />
        <h3 className={style.h3}>Your Outfit</h3>
        <YourOutfit
          caroselClickRight={this.caroselClickRight}
          caroselClickLeft={this.caroselClickLeft}
          addToOutfit={this.addToOutfit}
          outfitInfo={this.state}
          removeFromOutfit={this.removeFromOutfit}
          cardClick={this.relatedCardClick}
          list='outfit'
        />
      </div>
    )
  }
}

export default Related;