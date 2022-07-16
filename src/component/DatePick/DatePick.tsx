import { DatePicker } from "@mantine/dates";
import { FC } from "react";

type Props = {
  date: Date | null | undefined;
  handleDate: (e: Date) => void;
};

export const DatePick: FC<Props> = (props) => {
  const { date, handleDate } = props;
  return (
    <>
      <p className="text-[14px] font-bold mt-3">
        date<span className="text-rose-500">*</span>
      </p>
      <DatePicker
        classNames={{ input: "rounded-none" }}
        placeholder="日付を選択"
        inputFormat="YYYY-MM-DD"
        onChange={handleDate}
        clearable={true}
        value={date}
        required
      />
    </>
  );
};
