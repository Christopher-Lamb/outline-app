import React, { createContext, useContext, useState, useEffect } from "react";
import { addRowFunc, deleteRowFunc, updateRowFunc, disableRowsFunc } from "../utils/jsonObjFunctions.js";
import { updateDB } from "../utils/indexedDB.js";
import axios from "axios";
import useDebounce from "../hooks/useDebounce.js";
const RowDataContext = createContext();

export const RowDataProvider = ({ children }) => {
  const [rowData, setRowData] = useState({});
  const [hoveringList, setHoveringList] = useState([]);
  const [childHover, setChildHover] = useState();
  const [isDragging, setIsDragging] = useState(false);
  const debouncedInputValue = useDebounce(rowData, 1000);
  const [_id, setId] = useState();
  const [title, setTitle] = useState();
  const debouncedTitle = useDebounce(title, 1000);

  useEffect(() => {
    const array = hoveringList;
    const lastItem = array.length > 0 ? array[array.length - 1] : undefined; // or some default value
    setChildHover(lastItem);
  }, [hoveringList]);

  const addHoveringList = (id) => {
    setHoveringList((hl) => [...hl, id]);
  };

  const rmHoveringList = (id) => {
    setHoveringList((prevState) => prevState.filter((item) => item !== id));
  };

  const getRow = (id) => {
    return rowData[id];
  };

  const disableRows = (parentId, bool) => {
    const obj = disableRowsFunc(rowData, parentId, bool);
    setRowData(obj);
  };

  const addRow = (parentId) => {
    const newObj = addRowFunc(rowData, parentId);
    setRowData(newObj);
  };

  const deleteRow = (delId) => {
    if (delId === "row-1") {
    } else {
      const newObj = deleteRowFunc(rowData, delId);
      setRowData(newObj);
    }
  };

  const getRowOrder = () => {
    if (rowData.rowOrder) {
      return rowData.rowOrder;
    }
  };
  const updateRow = (rowId, content) => {
    const newObj = updateRowFunc(rowData, rowId, content);
    setRowData(newObj);
  };

  const setObj = (obj) => {
    setRowData(obj);

    return obj;
  };

  useEffect(() => {
    const onChange = async () => {
      if (Object.keys(rowData).length !== 0) {
        try {
          await axios.put("http://localhost:3240/api/outline", { name: rowData["main"].content, data: JSON.stringify(rowData) });
        } catch (err) {
          updateDB(_id, { title: title, data: rowData });
        }
      }
    };
    onChange();
  }, [debouncedInputValue, debouncedTitle]);

  return (
    <RowDataContext.Provider
      value={{ rowData, isDragging, disableRows, setIsDragging, setObj, getRow, addRow, deleteRow, updateRow, getRowOrder, rmHoveringList, addHoveringList, childHover, setId, setTitle, title }}
    >
      {children}
    </RowDataContext.Provider>
  );
};

export const useRowData = () => useContext(RowDataContext);
