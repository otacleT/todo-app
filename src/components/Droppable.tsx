import React from "react";
import { useDroppable } from "@dnd-kit/core";

const Droppable = (props: any) => {
  const { setNodeRef } = useDroppable({
    id: props.id,
  });

  return (
    <div ref={setNodeRef} className="w-full rounded-md bg-gray-200 p-2">
      {props.children}
    </div>
  );
};

export default Droppable;
