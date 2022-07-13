import dayjs from "dayjs";
import { CSSProperties, FC } from "react";

type Props = {
  title?: string;
  date?: Date | null;
  color?: string;
};

/**@package */
export const TodoBlock: FC<Props> = (props) => {
  const { title, date, color } = props;
  const style: CSSProperties = {
    borderLeft: `5px solid ${color}`,
  };

  return (
    <button
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
      <span
        className={`block w-5 h-5 rounded-full bg-cyan-500 absolute right-2 bottom-2`}
      ></span>
    </button>
  );
};
