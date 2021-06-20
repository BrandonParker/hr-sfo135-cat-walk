import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import style from './QA_CSS/searchBox.module.css';

const SearchBox = (props) => {

  const buttonIcon = <FontAwesomeIcon icon={faSearch} />;

  return (
    <div className={style.searchbox}>
      <input onChange={props.handleInputChange} type="text" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." className={style.input}></input>
      <i className={style.button}>{buttonIcon}</i>
    </div>
  );
};

export default SearchBox;