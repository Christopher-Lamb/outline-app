const reorderItemsInSameList = (obj, source, destination) => {
  //Use the Droppable Id to find the array we are targeting
  // splice that array based on source and destination
  //If the object isnt copied then it will write to the object directly and not cause a state change
  const newObject = { ...obj };

  const id = source.droppableId;
  let targetArr = newObject[id].rowIds;
  const itemRemoved = targetArr.splice(source.index, 1)[0];
  targetArr.splice(destination.index, 0, itemRemoved);
  newObject[id].rowIds = targetArr;

  return newObject;
};
const reorderItemsInDifferentLists = (obj, source, destination, draggableId) => {
  const newObject = { ...obj };
  //Remove index from the source
  const sourceId = source.droppableId;
  const sourceArr = newObject[sourceId].rowIds;
  const sourceIndex = source.index;
  sourceArr.splice(sourceIndex, 1);

  //Add at position at destination
  const destinationId = destination.droppableId;
  const destinationArr = newObject[destinationId].rowIds;
  const destinationIndex = destination.index;
  destinationArr.splice(destinationIndex, 0, draggableId);

  return newObject;
};

export { reorderItemsInSameList, reorderItemsInDifferentLists };
