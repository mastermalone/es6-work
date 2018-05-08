export const FetchImpl = (() => {
  'use strict';
  
  return {
    get: (url) => {
      console.log('GET DATA', url);
    },
    post: (arguments) => {
      console.log('POST DATA', arguments);
    }
  };
}());