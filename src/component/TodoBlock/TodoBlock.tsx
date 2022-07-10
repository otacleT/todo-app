import dayjs from "dayjs";
import { FC } from "react";

type Props = {
  title?: string;
  date: Date | undefined;
};

/**@package */
export const TodoBlock: FC<Props> = (props) => {
  const { title, date } = props;
  return (
    <button className="text-md font-bold block border-2 border-gray-300 shadow-lg shadow-black/30 w-full p-2 rounded-md">
      {title}
      <br />
      {date ? (
        <span className="text-sm font-bold text-gray">
          {dayjs(date).format("YYYY-MM-DD")}
        </span>
      ) : null}
    </button>
  );
};
