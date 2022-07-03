import { ChangeEventHandler, FC, useState } from "react";
import { MdOutlineCalendarToday } from "react-icons/md";
import { AddSchejule } from "../Addschejule";

type Props = {
  [key: string]: string[];
};

type TodoInput = {
  setItems: React.Dispatch<React.SetStateAction<Props>>;
};

/**@package */
export const AddTodo: FC<TodoInput> = (props) => {
  const { setItems } = props;
  const [text, setText] = useState("");
  // const [date, setDate] = useState(dayjs());
  // const [focused, setFocused] = useState<boolean>(false);

  const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setText(e.target.value);
  };
  const handleAdd = () => {
    setItems((prevItems) => {
      const { dont } = prevItems;
      return { ...prevItems, dont: [...dont, text] };
    });
    setText("");
  };

  return (
    <div className="w-[20%]">
      <h3 className="text-xl font-bold text-center">Todoリストを追加</h3>
      <input
        className="w-full border-2 border-gray-500/75  p-2 mt-3 rounded-sm"
        value={text}
        onChange={handleInput}
        type="text"
        placeholder="勉強する"
      />
      <div className="flex justify-between items-center mt-2">
        <h4 className="text-sm font-bold flex items-center">
          <MdOutlineCalendarToday className="text-xl mr-3" />
          期限
        </h4>
        {/* <SingleDatePicker
          date={date}
          onDateChange={(date) => setDate(date)}
          focused={focused}
          onFocusChange={({ focused }) => setFocused(focused)}
          id="date"
          displayFormat="YYYY-MM-DD"
          onClose={(focused) => setFocused(false)}
          disableScroll={true}
          numberOfMonths={1}
        /> */}
        <AddSchejule />
      </div>
      <button
        onClick={handleAdd}
        className="w-full mt-5 h-10 flex items-center justify-center text-md font-bold rounded-sm text-white bg-black"
      >
        追加
      </button>
    </div>
  );
};
