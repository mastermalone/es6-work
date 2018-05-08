import {Module1} from '../../scripts/module_1.js';
import {ClockModule} from '../../modules/clock/0.1/index-impl.js';

(function One() {
  'use strict';
  
 //import {Module1} from '../../scripts/module_1.js';
 
 let mike = 'Mike';
  console.log('JS is LOADING');
  
  let time = ClockModule.countDown(20);
  console.log('THE TIME', time);
  
  Module1.init();
  
  function *gen() {
    try {
      console.log('a:', yield 1);
      console.log('b:', yield 2);
      console.log('c:', yield 3);
    } finally {
      console.log('Finally!');
      console.log('d:', yield 4);
    }
  }
  
  let it = gen();
  it.next();
  it.next(25);
  it.next(7);
  it.next(3);
  
}());
