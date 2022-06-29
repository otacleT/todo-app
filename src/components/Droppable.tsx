import React from "react";
import { useDroppable } from "@dnd-kit/core";

const Droppable = (props: any) => {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-full rounded-md bg-gray-200 p-2"
    >
      {props.children}
    </div>
  );
};

export default Droppable;
