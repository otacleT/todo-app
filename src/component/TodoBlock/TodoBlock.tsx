import dayjs from "dayjs";
import { CSSProperties, FC } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { AiOutlineEdit } from "react-icons/ai";
import { UniqueIdentifier } from "@dnd-kit/core";

type Props = {
  id: UniqueIdentifier;
  title?: string;
  date?: Date | null;
  color?: string;
  handleDelete: (id: UniqueIdentifier) => void;
};

/**@package */
export const TodoBlock: FC<Props> = (props) => {
  const { id, title, date, color, handleDelete } = props;
  const style: CSSProperties = {
    borderLeft: `5px solid ${color}`,
  };

  return (
    <div
      style={style}
      className="relative text-md font-bold block text-left shadow-lg shadow-black/30 w-full py-2 px-4"
    >
      {title}
      <br />
      {date ? (
        <span className="text-sm font-bold text-gray border-t-2 text-gray-500 border-gray-500 mt-3 inline-block">
          {dayjs(date).format("YYYY-MM-DD")}
        </span>
      ) : null}
      <ul className="flex justify-between absolute right-2 bottom-1">
        <li className="px-1">
          <button
            data-dndkit-disabled-dnd-flag="true"
            className="text-lg"
            onClick={() => console.log("ok")}
          >
            <AiOutlineEdit />
          </button>
        </li>
        <li className="px-1">
          <button
            data-dndkit-disabled-dnd-flag="true"
            className="text-lg"
            onClick={() => handleDelete(id)}
          >
            <IoTrashOutline />
          </button>
        </li>
        <li className="px-1">
          <span className="block w-5 h-5 rounded-full bg-cyan-500"></span>
        </li>
      </ul>
    </div>
  );
};
