import {Fetch} from '../../js/0.1/fetch-service/0.1/index.js';

(function () {
  'use strict';
  console.log('THE FETCH OBJECT', Fetch);
  let triggerGet = () => {
    Fetch.get('my.domain.com/GetUserData/init');
  }
  
  triggerGet();
  
}());