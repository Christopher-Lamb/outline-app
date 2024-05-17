import React, { useEffect, useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useRowData } from "../context/RowDataContext";
import { findParentCount } from "../utils/parentCounter";
import DynamicInput from "./DynamicInput";
import RowHandler from "./RowHandler";
import useDebounce from "../hooks/useDebounce";

const disabled = true;

const RowItem = ({ rowId, index }) => {
  // const [isHover, setIsHovering] = useState(false);
  const [depth, setDepth] = useState();
  const [divider, setDivider] = useState();
  const { updateRow, rowData, getRow, addHoveringList, rmHoveringList, childHover, isDragging } = useRowData();
  // function somewhere to pass children ids
  // Row will take an id title rowIds
  const [inputValue, setInputValue] = useState();
  const debouncedInputValue = useDebounce(inputValue, 1000);

  const handleHover = () => {
    addHoveringList(rowId);
  };

  const handleHoverEnd = () => {
    rmHoveringList(rowId);
  };

  useEffect(() => {
    const depth = findParentCount(rowData, rowId);
    setDepth(depth);
    if (rowData["row-1"].rowIds.includes(rowId)) {
      const index = rowData["row-1"].rowIds.indexOf(rowId);
      if (index === 0) {
        setDivider(false);
      } else {
        setDivider(true);
      }
    }
    const content = rowData[rowId].content;
    setInputValue(content);
  }, []);

  // Debounced function
  const handleEdit = (e) => {
    setInputValue(e.target.value);
  };
  useEffect(() => {
    updateRow(rowId, debouncedInputValue);
  }, [debouncedInputValue]);

  return (
    <>
      {divider && <div className="w-full h-1 bg-white mb-3" style={{ background: `var(--primary-color)` }}></div>}
      <Draggable draggableId={rowId} index={index}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} onMouseEnter={handleHover} onMouseLeave={handleHoverEnd} className="row-item items-center" {...provided.draggableProps}>
            {/* <div className="w-5 h-5 bg-black float-right text-white" {...provided.dragHandleProps}></div> */}
            {childHover === rowId ? <RowHandler rowId={rowId} handleProps={{ ...provided.dragHandleProps }} /> : <div {...provided.dragHandleProps}></div>}
            <div
              className="rounded-xl"
              style={{ background: snapshot.isDragging ? "1px solid black" : "" }}
              //
            >
              {/* <h1 className="text-[var(--background-text)])">{depth}</h1> */}
              {/* {color && (
                <div className="w-10 h-10 bg-white rounded-3xl absolute text-black" style={{ background: ` hsl( ${color}, 100%, 50%)` }}>
                  {color}
                </div>
              )} */}
              <DynamicInput
                className={rowData[rowId].disabled ? "row-input-disabled" : "row-input" + " border border-black rounded-xl text-[var(--background-text)] py-2 px-4"}
                depth={depth}
                onChange={handleEdit}
                value={rowData[rowId].content}
                paddingY={8}
              />
              <Droppable droppableId={rowId} isCombineEnabled={true} isDropDisabled={childHover !== rowId} ignoreContainerClipping={true}>
                {(provided, dropSnapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      backgroundColor: childHover === rowId && isDragging ? "var(--drop-color)" : "var(--background-color)",
                      paddingLeft: 50,
                      paddingBottom: snapshot.isDragging ? 0 : 5,
                      paddingTop: snapshot.isDragging ? 0 : 4,
                    }}
                  >
                    {rowData[rowId] &&
                      rowData[rowId].rowIds.map((childRowId, i) => {
                        return <RowItem key={childRowId} index={i} rowId={childRowId} />;
                      })}
                    {provided.placeholder}
                  </div>
                )}

                {/* <RowItem /> */}
              </Droppable>
            </div>
          </div>
        )}
      </Draggable>
    </>
  );
};

export default RowItem;
