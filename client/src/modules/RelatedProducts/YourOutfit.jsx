import React from 'react';
import ProductCard from './ProductCard.jsx';
import AddOutfit from './AddProductCard.jsx';
import style from './RelatedCSS/Lists.module.css';
import btnStyle from './RelatedCSS/Buttons.module.css';

class YourOutfit extends React.Component {
  constructor (props) {
    super (props);
  }

  render () {
    return (
      <div className={style.carosel} data-testid='list'>
        {this.props.outfitInfo.outfitStart !== 0
        ? <button
            className={btnStyle.nav}
            data-testid='clickLeft'
            onClick={(event) => {this.props.caroselClickLeft('outfit')}}
          >&larr;</button>
        : null}
        <div className={style.list}>
          <AddOutfit
            addToOutfit={this.props.addToOutfit}
            currentProduct={this.props.outfitInfo.currentProduct}
          />
          {this.props.outfitInfo.outfitList.length > 0
          ? this.props.outfitInfo.outfitCarosel.map((product, index) => {
              return <ProductCard
                       key={index + 'outfit' + product.productDetails[0]}
                       product={product}
                       actionButton={this.props.removeFromOutfit}
                       cardClick={this.props.cardClick}
                       list={this.props.list}
                     />
            })
          : null}
        </div>
        {this.props.outfitInfo.outfitEnd < this.props.outfitInfo.outfitList.length
          ? <button
              className={btnStyle.nav}
              data-testid='clickRight'
              onClick={(event) => {this.props.caroselClickRight('outfit')}}
            >&rarr;</button>
          : null}
      </div>
    )
  }
}

export default YourOutfit;

