import { UniqueIdentifier } from "@dnd-kit/core";
import dayjs from "dayjs";
import { CSSProperties, FC, useCallback, useEffect, useState } from "react";
import { Frown, Meh, Smile } from "react-feather";
import { AiOutlineEdit } from "react-icons/ai";
import { IoTrashOutline } from "react-icons/io5";

type Props = {
  id: UniqueIdentifier | undefined;
  title: string | undefined;
  date: Date | null | undefined;
  color: string | undefined;
  handleDelete: (id: UniqueIdentifier | undefined) => void;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
};

/**@package */
export const TodoBlock: FC<Props> = (props) => {
  const { id, title, date, color, handleDelete, setIsShow } = props;
  const [deadline, setDeadline] = useState<string>("");
  const style: CSSProperties = {
    borderLeft: `5px solid ${color}`,
  };
  const smile: CSSProperties = {
    borderBottom: "3px solid #00CED1",
  };
  const meh: CSSProperties = {
    borderBottom: "3px solid #FDCE00",
  };
  const frown: CSSProperties = {
    borderBottom: "3px solid #ef4050",
  };

  const handleDeadline = useCallback(() => {
    const now = new Date();
    const cnt = Math.round((Number(date) - Number(now)) / 1000 / 60 / 60 / 24);
    switch (true) {
      case cnt > 3:
        setDeadline("smile");
        break;
      case cnt >= 0:
        setDeadline("meh");
        break;
      case cnt < 0:
        setDeadline("frown");
        break;
      default:
    }
  }, [date, deadline]);

  const handleIcon = useCallback((dl: string) => {
    switch (dl) {
      case "smile":
        return (
          <span style={smile} className="icon border-b-2 border-black block">
            <Smile />
          </span>
        );
      case "meh":
        return (
          <span style={meh} className="icon border-b-2 border-black block">
            <Meh />
          </span>
        );
      case "frown":
        return (
          <span style={frown} className="icon border-b-2 border-black block">
            <Frown />
          </span>
        );
      default:
        return;
    }
  }, []);
  useEffect(() => {
    if (date === null || date === undefined) return;
    handleDeadline();
    const timeoutId = setTimeout(() => {
      handleDeadline();
      // 一日ごとに更新
    }, 86400000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [date, deadline]);
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
          <li className="px-1">
            <button
              data-dndkit-disabled-dnd-flag="true"
              className="text-lg"
              onClick={() => handleDelete(id)}
            >
              <IoTrashOutline />
            </button>
          </li>
          <li className="px-1">{handleIcon(deadline)}</li>
        </ul>
      </ul>
    </div>
  );
};
