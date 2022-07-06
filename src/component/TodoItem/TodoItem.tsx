import React, { FC } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TodoBlock } from "../TodoBlock";
import { UniqueIdentifier } from "@dnd-kit/core";

type Props = {
  item: { id: UniqueIdentifier; title: string; date: Date };
};

/**@package */
export const TodoItem: FC<Props> = (props) => {
  const { item } = props;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

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
      <TodoBlock item={item} />
    </div>
  );
};
