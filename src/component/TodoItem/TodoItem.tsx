import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { FC } from "react";
import { TodoBlock } from "../TodoBlock";

type Props = {
  id: UniqueIdentifier;
  title?: string;
  date?: Date | null;
  color?: string;
  handleDelete: (id: UniqueIdentifier) => void;
  handleVisible: () => void;
};

/**@package */
export const TodoItem: FC<Props> = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div className="mt-3 first:mt-0" ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TodoBlock
        id={props.id}
        title={props.title}
        date={props.date}
        color={props.color}
        handleDelete={props.handleDelete}
        handleVisible={props.handleVisible}
      />
    </div>
  );
};
