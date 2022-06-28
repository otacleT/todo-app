import React from "react";
import { useDraggable } from "@dnd-kit/core";

const Draggable = (props: any) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: props.id,
  });

  return (
    <button
      ref={setNodeRef}
      // className="w-full font-bold text-md first:mt-0 mt-3 rounded-md shadow-sm shadow-black bg-white p-2"
      className="font-bold text-md first:mt-0 mt-3 rounded-md shadow-sm shadow-black bg-white p-2"
      {...listeners}
      {...attributes}
    >
      {props.children}
    </button>
  );
};

export default Draggable;
