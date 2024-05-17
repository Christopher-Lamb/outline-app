import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useRowData } from "../context/RowDataContext";

const Drop = ({ droppableId, children, className }) => {
  const [isHover, setIsHovering] = useState(false);
  const { addHoveringList, rmHoveringList, childHover, isDragging } = useRowData();
  const handleHover = () => {
    setIsHovering(true);
    addHoveringList(droppableId);
  };

  const handleHoverEnd = () => {
    setIsHovering(false);
    rmHoveringList(droppableId);
  };

  return (
    <Droppable droppableId={droppableId} isCombineEnabled={true} isDropDisabled={childHover !== droppableId} ignoreContainerClipping>
      {(provided, snapshot) => (
        <div
          onMouseEnter={handleHover}
          onMouseLeave={handleHoverEnd}
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            backgroundColor: childHover === "main" && isDragging ? "var(--drop-color)" : "var(--background-color)",
            paddingLeft: 16,
            paddingBottom: 16,
            paddingTop: 16,
            minHeight: `{5rem}`,
          }}
          className={className}
        >
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Drop;
