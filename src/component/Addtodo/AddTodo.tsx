import { UniqueIdentifier } from "@dnd-kit/core";
import { doc, setDoc } from "firebase/firestore";
import { ChangeEventHandler, FC, useCallback, useState } from "react";
import { useUser } from "src/hooks/useAuth";
import { db } from "src/lib/Firebase";
import { ColorPick } from "../ColorPick";
import { DatePick } from "../DatePick";
import { InputTitle } from "../InputTitle";

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
  const user = useUser();
  const { setItems } = props;
  const [text, setText] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null);
  const [color, setColor] = useState<string>("");

  const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setText(e.target.value);
  };
  const handleAdd = useCallback(async () => {
    const addId = Math.round(Math.random() * 10000000000);
    if (user) {
      const docRef = doc(db, `users/${user.uid}/todos`, String(addId));
      await setDoc(docRef, {
        title: text,
        color: color,
        status: "todo",
        date: date,
      });
    }
    setItems((prevItems) => {
      const { todo } = prevItems;
      const newItems = {
        ...prevItems,
        todo: [
          ...todo,
          {
            id: addId,
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
    setColor("");
  }, [text, date, color, user]);

  const handleColor = useCallback((e: string) => {
    setColor(e);
  }, []);
  const handleDate = useCallback((e: Date) => {
    setDate(e);
  }, []);
  return (
    <div className="w-[20%]">
      <h3 className="text-xl font-bold text-center">Todoリストを追加</h3>
      <InputTitle text={text} handleInput={handleInput} />
      <DatePick date={date} handleDate={handleDate} />
      <ColorPick color={color} handleColor={handleColor} />
      {text != "" && date != null ? (
        <button
          onClick={handleAdd}
          className="w-full mt-5 h-10 flex items-center justify-center text-md font-bold rounded-full text-white bg-black"
        >
          追加
        </button>
      ) : (
        <button className="w-full mt-5 h-10 flex items-center justify-center text-md font-bold rounded-full text-white bg-black opacity-75 cursor-not-allowed">
          追加
        </button>
      )}
    </div>
  );
};
