import { DatePicker } from "@mantine/dates";
import { AiOutlineCalendar } from "react-icons/ai";

/**@package */
export const AddSchejule = ({
  setDate,
}: {
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}) => {
  const handleDate = (e: Date) => {
    setDate(e);
  };
  return (
    <div>
      <p className="text-[14px] font-bold">date</p>
      <DatePicker
        classNames={{ input: "rounded-none" }}
        placeholder="日付を選択"
        inputFormat="YYYY-MM-DD"
        onChange={handleDate}
        clearable={true}
        required
      />
    </div>
  );
};
