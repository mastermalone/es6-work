import {FetchImpl} from 'index-impl';

export const Fetch = ((FetchImpl) => {
  'use strict';
  console.log('THE FETCH OBJECT');
  
  return FetchImpl;
}());
