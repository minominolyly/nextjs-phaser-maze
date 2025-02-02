function shuffle<T>(array: Array<T>): Array<T> {
  return array.toSorted(() => Math.random() - 0.5);
}

const arrayUtility = {
  shuffle,
};
export default arrayUtility;
