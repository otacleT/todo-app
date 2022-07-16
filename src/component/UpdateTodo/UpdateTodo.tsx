import React, { FC } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { UniqueIdentifier } from "@dnd-kit/core";
import { ColorPick } from "../ColorPick";
import { DatePick } from "../DatePick";
import { InputTitle } from "../InputTitle";

type Props = {
  id: UniqueIdentifier | undefined;
  title: string | undefined;
  date: Date | null | undefined;
  color: string | undefined;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  handleText: React.ChangeEventHandler<HTMLInputElement>;
  handleDate: (e: Date) => void;
  handleColor: (e: string) => void;
  handleChange: (
    id: UniqueIdentifier | undefined,
    title: string | undefined,
    date: Date | null | undefined,
    color: string | undefined,
  ) => void;
};

export const UpdateTodo: FC<Props> = (props) => {
  const { setIsShow, id, title, date, color, handleText, handleDate, handleColor, handleChange } =
    props;
  return (
    <>
      <div
        onClick={() => setIsShow(false)}
        className="w-full h-full fixed top-0 left-0 bg-black/30 z-40"
      ></div>
      <div className="w-2/3 max-w-[400px] shadow-lg shadow-black/30 fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-white px-3 pt-6 pb-3 rounded-sm z-50">
        <span
          onClick={() => setIsShow(false)}
          className="text-2xl absolute right-2 top-2 cursor-pointer"
        >
          <IoCloseOutline />
        </span>
        <InputTitle text={title} handleInput={handleText} />
        <DatePick date={date} handleDate={handleDate} />
        <ColorPick color={color} handleColor={handleColor} />
        <button
          className="w-full mt-5 h-10 flex items-center justify-center text-md font-bold rounded-full text-white bg-black"
          onClick={() => handleChange(id, title, date, color)}
        >
          変更する
        </button>
      </div>
    </>
  );
};
