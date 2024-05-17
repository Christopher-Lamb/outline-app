//Takes a number and adds subtracts 10 from it
const getCircularNumbers = (number, factor) => {
  //To get child colors
  let addNum = number + factor;
  let subNum = number - factor;
  if (addNum > 360) {
    addNum = addNum - 360;
  }
  if (subNum < 0) {
    subNum = 360 + subNum;
  }
  return [addNum, subNum];
};

function findParentCount(jsonData, nodeId) {
  // Build child-to-parent mapping
  const childToParent = {};
  for (const key in jsonData) {
    if (jsonData.hasOwnProperty(key)) {
      const element = jsonData[key];
      element.rowIds.forEach((childId) => {
        childToParent[childId] = key;
      });
    }
  }
  // // console.log(childToParent);
  // Count the number of parents
  let parentCount = 0;
  let currentNode = nodeId;
  let arr = [];
  while (childToParent.hasOwnProperty(currentNode)) {
    arr = [currentNode, ...arr];
    currentNode = childToParent[currentNode];
    parentCount++;
  }

  return parentCount;
}

export { findParentCount };
