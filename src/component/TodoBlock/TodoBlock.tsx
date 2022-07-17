import { UniqueIdentifier } from "@dnd-kit/core";
import clsx from "clsx";
import dayjs from "dayjs";
import { CSSProperties, FC, useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { IoTrashOutline } from "react-icons/io5";

type Props = {
  id: UniqueIdentifier | undefined;
  title: string | undefined;
  date: Date | null | undefined;
  color: string | undefined;
  handleDelete: (id: UniqueIdentifier) => void;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  label?: string;
};

/**@package */
export const TodoBlock: FC<Props> = (props) => {
  const { id, title, date, color, handleDelete, setIsShow, label } = props;
  const [currentTimeLimitColor, setCurrentTimeLimitColor] = useState<string>("");
  const style: CSSProperties = {
    borderLeft: `5px solid ${color}`,
  };

  useEffect(() => {
    const now = new Date().getTime();
    if (date) {
      const remain = Math.floor((date.getTime() - now) / (24 * 60 * 60 * 1000)) + 1;
      if (remain <= 1) {
        setCurrentTimeLimitColor("bg-red-500");
      } else if (1 < remain && remain <= 3) {
        setCurrentTimeLimitColor("bg-yellow-400");
      } else {
        setCurrentTimeLimitColor("bg-green-400");
      }
    }
  }, [date]);

  return (
    <div
      style={style}
      className="relative text-md font-bold block text-left shadow-lg shadow-black/30 w-full py-3 px-4"
    >
      {title}
      {label}
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
            {label !== "Done" && (
              <span className={clsx("block w-5 h-5 rounded-full", currentTimeLimitColor)}></span>
            )}
          </li>
        </ul>
      </ul>
    </div>
  );
};
