function addRowFunc(jsonData, parentId) {
  // Create a deep copy of rowData
  let workingObj = JSON.parse(JSON.stringify(jsonData));
  const newId = "id-" + new Date().getTime();
  const newRow = { id: newId, content: "", rowIds: [] };
  workingObj[parentId].rowIds = [...workingObj[parentId].rowIds, newId];
  workingObj[newId] = newRow;

  return workingObj;
}

function deleteRowFunc(jsonData, rowIdToDelete) {
  let parentId = null;
  let workingObj = JSON.parse(JSON.stringify(jsonData));

  // Recursive function to delete a row and its children
  function deleteRowAndChildren(workingObj, rowId) {
    const row = workingObj[rowId];
    if (row && row.rowIds) {
      row.rowIds.forEach((childId) => {
        deleteRowAndChildren(workingObj, childId);
      });
    }
    delete workingObj[rowId];
  }

  // 1. Find the parent of the rowIdToDelete
  for (const key in workingObj) {
    if (workingObj.hasOwnProperty(key)) {
      const row = workingObj[key];
      if (row.rowIds.includes(rowIdToDelete)) {
        parentId = key;
        break;
      }
    }
  }

  if (parentId) {
    // 2. Remove the ID from the parent's rowIds array
    const parentRow = workingObj[parentId];
    parentRow.rowIds = parentRow.rowIds.filter((id) => id !== rowIdToDelete);

    // 3. Recursively delete the rowIdToDelete and its children
    deleteRowAndChildren(workingObj, rowIdToDelete);

    return workingObj;
  } else {
    console.log("Parent not found or the rowIdToDelete is a top-level node.");
    return null;
  }
}

const updateRowFunc = (jsonData, updateId, content) => {
  let workingObj = { ...jsonData };
  workingObj[updateId].content = content;
  return workingObj;
};

function disableRowsFunc(obj, id, bool) {
  let jsonData = JSON.parse(JSON.stringify(obj));

  const recursivelyDisable = (parentChildId) => {
    // Check if the id exists in the jsonData
    if (jsonData.hasOwnProperty(parentChildId)) {
      // Set the 'disabled' property of the current id to true
      jsonData[parentChildId].disabled = bool;

      // Recursively disable all children
      jsonData[parentChildId].rowIds.forEach((childId) => {
        // console.log(childId);
        recursivelyDisable(childId);
      });
    }
  };

  recursivelyDisable(id);
  return jsonData;
}

export { addRowFunc, deleteRowFunc, updateRowFunc, disableRowsFunc };
