import React, { ChangeEventHandler, FC, useCallback, useEffect, useState } from "react";
import { DatePicker } from "@mantine/dates";
import { ColorPicker } from "@mantine/core";
import { IoCloseOutline } from "react-icons/io5";
import { UniqueIdentifier } from "@dnd-kit/core";

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
        <p className="text-[14px] font-bold">
          title<span className="text-rose-500">*</span>
        </p>
        <input
          className="w-full border border-[#ced4da] leading-[34px] px-[12px] rounded-sm text-[14px]"
          type="text"
          value={title}
          placeholder="勉強する"
          onChange={handleText}
        />
        <p className="text-[14px] font-bold mt-3">
          date<span className="text-rose-500">*</span>
        </p>
        <DatePicker
          classNames={{ input: "rounded-none" }}
          placeholder="日付を選択"
          inputFormat="YYYY-MM-DD"
          clearable={true}
          value={date}
          onChange={handleDate}
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
          value={color}
          onChange={handleColor}
        />
        {color ? (
          <p className="text-center text-md font-[14px] leading-[34px] border-[#ced4da] border mt-2">
            {color}
          </p>
        ) : null}
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
