import Artist from "../types/Artist";

export const chunkArray = (myArray: Array<Artist>, chunk_size: number) => {
  var results = [];
  console.log(myArray);

  while (myArray.length) {
    results.push(myArray.splice(0, chunk_size));
  }

  console.log(results);
  return results;
};

export default chunkArray;
