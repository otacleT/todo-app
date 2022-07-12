import { UniqueIdentifier } from "@dnd-kit/core";
import { ColorPicker } from "@mantine/core";
import { ChangeEventHandler, FC, useState } from "react";
import { AddSchejule } from "../Addschejule";

type Props = {
  [key: string]: {
    id: UniqueIdentifier;
    title: string;
    date: Date | undefined;
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
  const [date, setDate] = useState<Date | undefined>();
  const [color, setColor] = useState<string>("");

  const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setText(e.target.value);
  };
  const handleAdd = () => {
    setItems((prevItems) => {
      const { todo } = prevItems;
      return {
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
    });
    setText("");
    setDate(undefined);
  };

  const handleColor = (e: string) => {
    setColor(e);
  };

  return (
    <div className="w-[20%]">
      <h3 className="text-xl font-bold text-center">Todoリストを追加</h3>
      <input
        className="w-full border border-[#ced4da] leading-[34px] mt-3 px-[12px] rounded-sm text-[14px]"
        value={text}
        onChange={handleInput}
        type="text"
        placeholder="勉強する"
      />
      <div className="flex justify-between items-center mt-2">
        <AddSchejule setDate={setDate} />
      </div>
      <ColorPicker
        format="hex"
        swatches={[
          "#25262b",
          "#868e96",
          "#fa5252",
          "#e64980",
          "#be4bdb",
          "#7950f2",
          "#4c6ef5",
          "#228be6",
          "#15aabf",
          "#12b886",
          "#40c057",
          "#82c91e",
          "#fab005",
          "#fd7e14",
        ]}
        onChange={handleColor}
      />
      <button
        onClick={handleAdd}
        className="w-full mt-5 h-10 flex items-center justify-center text-md font-bold rounded-sm text-white bg-black"
      >
        追加
      </button>
    </div>
  );
};
