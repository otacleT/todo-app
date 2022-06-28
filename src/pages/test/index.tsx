import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import Draggable from "src/components/Draggable";
import Droppable from "src/components/Droppable";

function Test() {
  const containers = ["A", "B", "C", "D"];
  const [parent, setParent] = useState(null);
  const draggableMarkup = <Draggable id="draggable">Drag me</Draggable>;

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {parent === null ? draggableMarkup : null}

      <div className="max-w-3xl flex justify-between mx-auto flex-wrap">
        {containers.map((id) => (
          // We updated the Droppable component so it would accept an `id`
          // prop and pass it to `useDroppable`
          <Droppable key={id} id={id}>
            {parent === id ? draggableMarkup : "Drop here"}
          </Droppable>
        ))}
      </div>
    </DndContext>
  );

  function handleDragEnd(event: any) {
    const { over } = event;

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? over.id : null);
  }
}

export default Test;
