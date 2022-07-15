import { UniqueIdentifier } from "@dnd-kit/core";
import { ColorPicker } from "@mantine/core";
import { ChangeEventHandler, FC, useCallback, useState } from "react";
import { DatePicker } from "@mantine/dates";

type Props = {
  [key: string]: {
    id: UniqueIdentifier;
    title: string;
    date: Date | null;
    color: string;
  }[];
};

type TodoInput = {
  setItems: React.Dispatch<React.SetStateAction<Props>>;
};

/**@package */
export const AddTodo: FC<TodoInput> = (props) => {
  const { setItems } = props;
  const [text, setText] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null);
  const [color, setColor] = useState<string>("");

  const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setText(e.target.value);
  };
  const handleAdd = useCallback(() => {
    setItems((prevItems) => {
      const { todo } = prevItems;
      const newItems = {
        ...prevItems,
        todo: [
          ...todo,
          {
            id: Math.round(Math.random() * 100000),
            title: text,
            date: date,
            color: color,
          },
        ],
      };
      return newItems;
    });
    setText("");
    setDate(null);
    setColor("#ffffff");
  }, [text, date, color]);

  const handleColor = useCallback((e: string) => {
    setColor(e);
  }, []);
  const handleDate = useCallback((e: Date) => {
    setDate(e);
  }, []);

  return (
    <div className="w-[20%]">
      <h3 className="text-xl font-bold text-center">Todoリストを追加</h3>
      <p className="text-[14px] font-bold">
        title<span className="text-rose-500">*</span>
      </p>
      <input
        className="w-full border border-[#ced4da] leading-[34px] px-[12px] rounded-sm text-[14px]"
        value={text}
        onChange={handleInput}
        type="text"
        placeholder="勉強する"
      />
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
      <p className="text-[14px] font-bold mt-3">color</p>
      <ColorPicker
        format="hex"
        swatches={[
          "#fa5252",
          "#e64980",
          "#be4bdb",
          "#7950f2",
          "#4c6ef5",
          "#228be6",
          "#15aabf",
          "#82c91e",
          "#fab005",
          "#fd7e14",
        ]}
        onChange={handleColor}
      />
      {color ? (
        <p className="text-center text-md font-[14px] leading-[34px] border-[#ced4da] border mt-2">
          {color}
        </p>
      ) : null}
      {text != "" && date != null ? (
        <button
          onClick={handleAdd}
          className="w-full mt-5 h-10 flex items-center justify-center text-md font-bold rounded-full text-white bg-black"
        >
          追加
        </button>
      ) : (
        <button className="w-full mt-5 h-10 flex items-center justify-center text-md font-bold rounded-full text-white bg-black opacity-50 cursor-not-allowed">
          追加
        </button>
      )}
    </div>
  );
};
