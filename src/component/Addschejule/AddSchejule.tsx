import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { ChangeEventHandler } from "react";
import { BsCalendar } from "react-icons/bs";

type Props = { date: Date };

/**@package */
export const AddSchejule = ({
  setDate,
}: {
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}) => {
  const handleDate = (e: Date) => {
    console.log(dayjs(e).format("YYYY-MM-DD"));
    setDate(e);
  };
  return (
    <div className="flex justify-between">
      <p className="w-[80px] text-md flex justify-around items-center text-lg">
        <BsCalendar />
        <span className="text-sm">期限</span>
      </p>
      <DatePicker
        className="w-[calc(100%-90px)]"
        classNames={{ input: "rounded-none" }}
        placeholder="日付を選択"
        inputFormat="YYYY-MM-DD"
        onChange={handleDate}
        required
      />
    </div>
  );
};
