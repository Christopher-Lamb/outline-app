import React from "react";
import { FaEdit } from "react-icons/fa";
import { VscChromeMinimize } from "react-icons/vsc";
import { IoIosAdd } from "react-icons/io";
import { MdDragHandle } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { useRowData } from "../context/RowDataContext";

const size = "1.5rem";
const RowHandler = ({ handleProps, rowId }) => {
  const { addRow, rowData, deleteRow, disableRows } = useRowData();

  const handleAddRow = () => {
    addRow(rowId);
  };

  const handleDeleteRow = () => {
    deleteRow(rowId);
  };

  const handleDisable = () => {
    const bool = !rowData[rowId].disabled;
    disableRows(rowId, bool);
  };

  return (
    <div className="relative handle">
      <div className="flex bg-[var(--accent-color)] absolute top-[-20px] rounded">
        <button onClick={handleDisable}>
          <VscChromeMinimize size={size} className="fill-[var(--accent-text)]" />
        </button>
        <button onClick={handleAddRow}>
          <IoIosAdd size={size} className="fill-[var(--accent-text)]" />
        </button>
        <div {...handleProps}>
          <MdDragHandle size={size} className="fill-[var(--accent-text)]" />
        </div>
        <button onClick={handleDeleteRow}>
          <MdDeleteOutline size={size} className="fill-[var(--accent-text)]" />
        </button>
      </div>
    </div>
  );
};

export default RowHandler;
