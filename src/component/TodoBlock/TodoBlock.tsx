import { UniqueIdentifier } from "@dnd-kit/core";
import dayjs from "dayjs";
import { CSSProperties, FC } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { IoTrashOutline } from "react-icons/io5";

type Props = {
  id: UniqueIdentifier | undefined;
  title: string | undefined;
  date: Date | null | undefined;
  color: string | undefined;
  handleDelete: (id: UniqueIdentifier) => void;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
};

/**@package */
export const TodoBlock: FC<Props> = (props) => {
  const { id, title, date, color, handleDelete, setIsShow } = props;
  const style: CSSProperties = {
    borderLeft: `5px solid ${color}`,
  };

  return (
    <div
      style={style}
      className="relative text-md font-bold block text-left shadow-lg shadow-black/30 w-full py-3 px-4"
    >
      {title}
      <ul className="flex justify-between border-gray-500 border-t-2 mt-2 pt-2">
        <li className="text-sm font-bold text-gray text-gray-500 inline-block">
          {dayjs(date).format("YYYY-MM-DD")}
        </li>
        <ul className="flex justify-between">
          <li className="px-1">
            <button
              data-dndkit-disabled-dnd-flag="true"
              className="text-lg"
              onClick={() => setIsShow(true)}
            >
              <AiOutlineEdit />
            </button>
          </li>
          {id && (
            <li className="px-1">
              <button
                data-dndkit-disabled-dnd-flag="true"
                className="text-lg"
                onClick={() => handleDelete(id)}
              >
                <IoTrashOutline />
              </button>
            </li>
          )}
          <li className="px-1">
            <span className="block w-5 h-5 rounded-full bg-cyan-500"></span>
          </li>
        </ul>
      </ul>
    </div>
  );
};
