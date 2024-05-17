import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";

const Drag = ({ draggableId, index, children }) => {
  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} className=" items-center" {...provided.draggableProps} {...provided.dragHandleProps}>
          {children}
        </div>
      )}
    </Draggable>
  );
};

export default Drag;
