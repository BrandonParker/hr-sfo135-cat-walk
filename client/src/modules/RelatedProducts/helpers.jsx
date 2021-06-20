import React from 'react';
import ComparisonRows from './ComparisonTableRow.jsx';

const createCurrentObj = (currentProductInfoArr) => {
  let currentProductFeatures = {};

  currentProductInfoArr.forEach(detail => {
    currentProductFeatures[detail.feature] = detail.value;
  });

  return currentProductFeatures;
}

const createCompareObj = (compareProductInfoArr) => {
  let compareProductFeatures = {};

  compareProductInfoArr.forEach(detail => {
    compareProductFeatures[detail.feature] = detail.value;
  })

  return compareProductFeatures;
}

const getAllFeatures = (currentProductObj, compareProductObj) => {
  const currentProductKeys = Object.keys(currentProductObj);
  const compareProductKeys = Object.keys(compareProductObj);
  const allKeysArr = currentProductKeys.concat(compareProductKeys);
  const allFeaturesArr = [];

  allKeysArr.forEach(key => {
    if (allFeaturesArr.includes(key) === false) {
      allFeaturesArr.push(key);
    }
  })

  return allKeysArr;
}

const compareFeatures = (feature, currentProductObj, compareProductObj) => {
  if (currentProductObj[feature] && compareProductObj[feature]) {
    return <ComparisonRows
             key={feature}
             currentFeature={currentProductObj[feature]}
             feature={feature}
             compareFeature={compareProductObj[feature]}
            />;
  } else if (currentProductObj[feature] && compareProductObj[feature] === undefined) {
    return <ComparisonRows
             key={feature}
             currentFeature={currentProductObj[feature]}
             feature={feature}
             compareFeature='null'
            />;
  } else if (currentProductObj[feature] === undefined && compareProductObj[feature]) {
    return <ComparisonRows
             key={feature}
             currentFeature='null'
             feature={feature}
             compareFeature={compareProductObj[feature]}
            />;
  }
}

const caroselBeingClicked = (list) => {
  const listUsed = list + 'List';
  const caroselUsed = list + 'Carosel';
  const usedStart = list + 'Start';
  const usedEnd = list + 'End';

  const caroselInfoArray = [listUsed, caroselUsed, usedStart, usedEnd];

  return caroselInfoArray;
}

const getCaroselProducts = (productArr, start, end) => {
  if (productArr.length < end) {
    return productArr.slice();
  }

  const caroselArr = productArr.slice(start, end);

  return caroselArr;
}

export default {createCurrentObj, createCompareObj, getAllFeatures, compareFeatures, caroselBeingClicked, getCaroselProducts}