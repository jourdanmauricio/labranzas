export function isArrayEqual(arr1, arr2) {
  const isEqual =
    arr1.length === arr2.length &&
    arr1
      .map((item) => JSON.stringify(item))
      .every((item) =>
        arr2.map((item2) => JSON.stringify(item2)).includes(item)
      );

  return isEqual;
}
