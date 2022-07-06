import { UniqueIdentifier } from "@dnd-kit/core";
import dayjs from "dayjs";
import { FC } from "react";

type Props = {
  item?: { id: UniqueIdentifier; title: string; date: Date };
};

/**@package */
export const TodoBlock: FC<Props> = (props) => {
  return (
    <button className="text-md font-bold block border-2 border-gray-300 shadow-lg shadow-black/30 w-full p-2 rounded-md">
      {props.item?.title}
      <span>{dayjs(props.item?.date).format("YYYY-MM-DD")}</span>
    </button>
  );
};
