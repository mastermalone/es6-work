import { MatchingSocks } from "../socks/socks.js";

/**
 * Given an array of integers, find the total number of matching pairs.
 */

const getPairs = () => {
  let socksList = [20, 10, 10, 12, 14, 11, 17, 15, 20, 14, 10, 10, 11, 11, 20];
  MatchingSocks.create(socksList);

  document.querySelector("#results").innerHTML = MatchingSocks.totalMatches;
};

getPairs();
