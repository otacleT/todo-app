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
};

/**@package */
export const TodoItem: FC<Props> = (props) => {
  const { id, title, date, color, handleDelete, handleUp } = props;
  const [before, setBefore] = useState<Update>({ id, title, date, color });
  const [isShow, setIsShow] = useState<boolean>(false);
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const handleText: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setBefore((prevBefore) => {
        return { ...prevBefore, title: e.target.value };
      });
    },

    [before],
  );
  const handleDate = useCallback(
    (e: Date) => {
      setBefore((prevBefore) => {
        return { ...prevBefore, date: e };
      });
    },
    [before],
  );
  const handleColor = useCallback(
    (e: string) => {
      setBefore((prevBefore) => {
        return { ...prevBefore, color: e };
      });
    },
    [before],
  );
  const handleChange = useCallback(
    (
      id: UniqueIdentifier | undefined,
      title: string | undefined,
      date: Date | null | undefined,
      color: string | undefined,
    ) => {
      handleUp(id, title, date, color);
      setIsShow(false);
    },
    [isShow],
  );

  useEffect(() => {
    setBefore({ id: id, title: title, date: date, color: color });
  }, []);

  return (
    <div className="mt-3 first:mt-0">
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <TodoBlock
          id={before.id}
          title={before.title}
          date={before.date}
          color={before.color}
          handleDelete={handleDelete}
          setIsShow={setIsShow}
        />
      </div>
      {isShow ? (
        <UpdateTodo
          setIsShow={setIsShow}
          id={before.id}
          title={before.title}
          date={before.date}
          color={before.color}
          handleChange={handleChange}
          handleText={handleText}
          handleDate={handleDate}
          handleColor={handleColor}
        />
      ) : null}
    </div>
  );
};
