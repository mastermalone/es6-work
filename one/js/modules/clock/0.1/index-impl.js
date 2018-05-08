export let ClockModule = (function ClockIife() {
  'use strict';
  
  let ClockWork =  {
    countDown : (time) => {
      let timer = {};
      //Set up countdown
      if (typeof time !== 'number' || time === 0) {
        return time;
      }
      
      return timer = setTimeout(() => {
        console.log('Ticking:', time);
        return ClockWork.countDown(time - 1);
      }, 1000);
    }
  }
  return {
    countDown: ClockWork.countDown
  }
}());
