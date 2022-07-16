import { UniqueIdentifier, useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { ColorPicker } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import React, { FC, useCallback, useState } from "react";
import { Update } from "../TodoContainer/TodoContainer";
import { TodoItem } from "../TodoItem";

type Props = {
  id: string;
  label: string;
  handleDelete: (id: UniqueIdentifier) => void;
  handleUp: (
    id: UniqueIdentifier | undefined,
    title: string | undefined,
    date: Date | null | undefined,
    color: string | undefined,
  ) => void;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  items: {
    id: UniqueIdentifier;
    title: string;
    date: Date | null;
    color: string;
  }[];
};

/**@package */
export const TodoList: FC<Props> = (props) => {
  const { id, label, items, handleDelete, handleUp, visible, setVisible } = props;
  const { setNodeRef } = useDroppable({
    id,
  });
  return (
    <div className="w-[calc(33%-5px)]">
      <h3 className="text-xl font-bold text-center">{label}</h3>
      <SortableContext id={id} items={items} strategy={verticalListSortingStrategy}>
        <div ref={setNodeRef} className="w-full border-2 border-gray-500/75 p-5 mt-2 rounded-md">
          {items.map((item) => (
            <TodoItem
              key={item.id}
              id={item.id}
              title={item.title}
              date={item.date}
              color={item.color}
              handleDelete={handleDelete}
              handleUp={handleUp}
              visible={visible}
              setVisible={setVisible}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};
