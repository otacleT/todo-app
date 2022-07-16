import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { ChangeEventHandler, FC, useCallback, useEffect, useState } from "react";
import { TodoBlock } from "../TodoBlock";
import { Update } from "../TodoContainer/TodoContainer";
import { UpdateTodo } from "../UpdateTodo";

type Props = {
  id: UniqueIdentifier;
  title?: string;
  date?: Date | null;
  color?: string;
  handleDelete: (id: UniqueIdentifier) => void;
  handleUp: (
    id: UniqueIdentifier | undefined,
    title: string | undefined,
    date: Date | null | undefined,
    color: string | undefined,
  ) => void;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

/**@package */
export const TodoItem: FC<Props> = (props) => {
  const { id, title, date, color, handleDelete, handleUp, visible, setVisible } = props;
  const [text, setText] = useState<string | undefined>();
  const [beforeDate, setBeforeDate] = useState<Date | null | undefined>();
  const [beforeColor, setBeforeColor] = useState<string | undefined>();
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const handleText: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setText(e.target.value);
    },

    [text],
  );
  const handleDate = useCallback((e: Date) => {
    setBeforeDate(e);
  }, []);
  const handleColor = useCallback((e: string) => {
    setBeforeColor(e);
  }, []);

  useEffect(() => {
    setText(title);
    setBeforeDate(date);
    setBeforeColor(color);
  }, []);
  return (
    <div className="mt-3 first:mt-0">
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <TodoBlock
          id={id}
          title={text}
          date={beforeDate}
          color={beforeColor}
          handleDelete={handleDelete}
          setVisible={setVisible}
        />
      </div>
      {visible ? (
        <UpdateTodo
          visible={visible}
          setVisible={setVisible}
          id={id}
          title={text}
          date={beforeDate}
          color={beforeColor}
          handleText={handleText}
          handleDate={handleDate}
          handleColor={handleColor}
          handleUp={handleUp}
        />
      ) : null}
    </div>
  );
};
