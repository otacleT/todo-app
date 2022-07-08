import React, { FC } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import dayjs from "dayjs";
import { UniqueIdentifier } from "@dnd-kit/core";

type Props = {
  id: UniqueIdentifier;
  title?: string;
  date?: Date;
};

const SortableItem: FC<Props> = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.id,
      transition: {
        duration: 150, // milliseconds
        easing: "cubic-bezier(0.25, 1, 0.5, 1)",
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className="w-full first:mt-0"
      // DOM要素を追跡できるように設定
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <button className="w-full text-center font-bold border-2 border-black bg-white mt-2">
        {props.title}
        <br />
        <span>{dayjs(props.date).format("YYYY-MM-DD")}</span>
      </button>
    </div>
  );
};

export default SortableItem;
