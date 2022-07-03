import React, { FC } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TodoBlock } from "../TodoBlock";

type Props = {
  id: string;
};

/**@package */
export const TodoItem: FC<Props> = (props) => {
  const { id } = props;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className="mt-3 first:mt-0"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <TodoBlock id={id} />
    </div>
  );
};
