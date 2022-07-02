import { ChangeEventHandler, FC, useState } from "react";

type Props = {
  [key: string]: string[];
};

const Addtodo: FC<{
  setItems: React.Dispatch<React.SetStateAction<Props>>;
}> = ({ setItems }) => {
  const handleAdd = () => {
    setItems((prevItems) => {
      const { container1 } = prevItems;
      return { ...prevItems, container1: [...container1, text] };
    });
    setText("");
  };
  const [text, setText] = useState("");
  const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setText(e.target.value);
  };
  return (
    <div className="w-[20%]">
      <h3 className="text-xl font-bold text-center">Add List</h3>
      <input
        className="w-full border border-black p-2 mt-3 rounded-sm"
        value={text}
        onChange={handleInput}
        type="text"
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

export default Addtodo;
