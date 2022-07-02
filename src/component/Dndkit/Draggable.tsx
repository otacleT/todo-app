import React from "react";
import { useDraggable } from "@dnd-kit/core";

export function Draggable(props: any) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`text-md font-bold border-2 border-gray-300 w-full max-w-[200px] p-2 rounded-md block mx-auto`}
    >
      {props.label}
    </button>
  );
}
