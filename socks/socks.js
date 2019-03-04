/**
 * Run time complexity: O(n log n);
 */
export const MatchingSocks = {
  totalMatches: 0,
  create: list => {
    //Return if the array is less than 2 or if it is not an array
    if (typeof list !== "object" || list.length < 2) {
      return list;
    }

    //Define a middle of the array and create two arrays from it
    let arrayMid = Math.floor(list.length / 2);
    let leftSide = list.slice(0, arrayMid);
    let rightSide = list.slice(arrayMid, list.length);

    //recursively call this this function as parameters of the merge function
    return MatchingSocks.merge(
      MatchingSocks.create(leftSide),
      MatchingSocks.create(rightSide)
    );
  },
  merge: function merge(left, right) {
    let mergedArray = [];
    let matchesHash = {};
    let matchesArray = [];

    //Array.prototype.shift removes the first element of an array
    //and returns it as a value.  The array 0 index will then
    //become what index 1 was
    while (left.length && right.length) {
      if (left[0] <= right[0]) {
        console.log("THE VALUE OF LEFT AND RIGHT", left[0], right[0]);
        this.updateHashTable(matchesHash, matchesArray, left);
        mergedArray.push(left.shift());
      } else {
        this.updateHashTable(matchesHash, matchesArray, right);
        mergedArray.push(right.shift());
      }
    }
    //Perform this if anything is left in the arrays.
    //These will only get called once and only one of them will fire
    while (left.length) {
      this.updateHashTable(matchesHash, matchesArray, left);
      mergedArray.push(left.shift());
    }

    while (right.length) {
      this.updateHashTable(matchesHash, matchesArray, right);
      mergedArray.push(right.shift());
    }
    this.totalMatches = `The total number of matching socks is ${
      matchesArray.length
    }`;
    console.log("SORTED RESULT:", mergedArray);
    console.log("Total matches", matchesArray.length);
    console.log("Integers that have a matching pair", matchesArray);
    return mergedArray;
  },
  updateHashTable: function(matchesHash, matchesArray, side) {
    if (!matchesHash[side[0]]) {
      matchesHash[side[0]] = side[0];
    } else {
      console.log("Found a match,", side[0]);
      matchesArray.push(side[0]);
      delete matchesHash[side[0]];
    }
  }
};
