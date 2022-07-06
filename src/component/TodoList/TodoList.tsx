import React, { FC, useMemo } from "react";
import { UniqueIdentifier, useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { TodoItem } from "../TodoItem";

type Props = {
  id: string;
  label: string;
  list: { id: UniqueIdentifier; title: string; date: Date }[];
};
/**@package */
export const TodoList: FC<Props> = (props) => {
  const { id, label, list } = props;
  const itemIds = list.map((item) => item.id);
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div className="w-[calc(33%-5px)]">
      <h3 className="text-xl font-bold text-center">{label}</h3>
      <SortableContext
        id={id}
        items={itemIds}
        strategy={verticalListSortingStrategy}
      >
        <div
          ref={setNodeRef}
          className="w-full border-2 border-gray-500/75 p-5 mt-2 rounded-md"
        >
          {list?.map((item) => (
            <TodoItem key={item.id} item={item} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};
