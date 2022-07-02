import React from "react";
import { useDroppable } from "@dnd-kit/core";

export function Droppable(props: any) {
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
      className="text-md font-bold shadow-gray-400 shadow-md border-2 border-gray-200 text-center p-3 w-[calc(33%-5px)] rounded-md mt-5"
    >
      {props.children}
    </div>
  );
}
