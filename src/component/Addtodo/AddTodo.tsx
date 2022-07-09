import { UniqueIdentifier } from "@dnd-kit/core";
import { ChangeEventHandler, FC, useState } from "react";

type Props = {
  [key: string]: UniqueIdentifier[];
};

type TodoInput = {
  setItems: React.Dispatch<React.SetStateAction<Props>>;
};

/**@package */
export const AddTodo: FC<TodoInput> = (props) => {
  const { setItems } = props;
  const [text, setText] = useState<string>("");

  const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setText(e.target.value);
  };
  const handleAdd = () => {
    setItems((prevItems) => {
      const { todo } = prevItems;
      return {
        ...prevItems,
        todo: [...todo, text],
      };
    });
    setText("");
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
      {/* <div className="flex justify-between items-center mt-2">
        <AddSchejule setDate={setDate} />
      </div> */}
      <button
        onClick={handleAdd}
        className="w-full mt-5 h-10 flex items-center justify-center text-md font-bold rounded-sm text-white bg-black"
      >
        追加
      </button>
    </div>
  );
};
