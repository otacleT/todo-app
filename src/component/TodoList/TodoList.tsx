import React, { FC } from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { TodoItem } from "../TodoItem";

type Props = {
  id: string;
  label: string;
  items: string[];
};

/**@package */
export const TodoList: FC<Props> = (props) => {
  const { id, items } = props;

  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div className="w-[calc(33%-5px)]">
      <h3 className="text-xl font-bold text-center">{props.label}</h3>
      <SortableContext
        id={id}
        items={items}
        strategy={verticalListSortingStrategy}
      >
        <div
          ref={setNodeRef}
          className="w-full border-2 border-gray-500/75 p-5 mt-2 rounded-md"
        >
          {items.map((id) => (
            <TodoItem key={id} id={id} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};
