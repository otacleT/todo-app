import { UniqueIdentifier, useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { ColorPicker } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import React, { FC, useCallback, useState } from "react";
import { TodoItem } from "../TodoItem";
import { IoCloseOutline } from "react-icons/io5";

type Props = {
  id: string;
  label: string;
  handleDelete: (id: UniqueIdentifier) => void;
  items: {
    id: UniqueIdentifier;
    title: string;
    date: Date | null;
    color: string;
  }[];
};

/**@package */
export const TodoList: FC<Props> = (props) => {
  const { id, label, items, handleDelete } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const { setNodeRef } = useDroppable({
    id,
  });
  const handleUpdate = useCallback(() => {
    setVisible(!visible);
  }, [visible]);
  return (
    <div className="w-[calc(33%-5px)]">
      <h3 className="text-xl font-bold text-center">{label}</h3>
      <SortableContext id={id} items={items} strategy={verticalListSortingStrategy}>
        <div ref={setNodeRef} className="w-full border-2 border-gray-500/75 p-5 mt-2 rounded-md">
          {items.map((item) => (
            <TodoItem
              key={item.id}
              id={item.id}
              title={item.title}
              date={item.date}
              color={item.color}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          ))}
        </div>
      </SortableContext>
      {visible ? (
        <div
          onClick={() => handleUpdate()}
          className="w-full h-full fixed top-0 left-0 bg-black/30"
        ></div>
      ) : null}
      {visible ? (
        <div className="w-2/3 max-w-[400px] shadow-lg shadow-black/30 fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-white px-3 pt-6 pb-3 rounded-sm">
          <span
            onClick={() => handleUpdate()}
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
            placeholder="勉強する"
          />
          <p className="text-[14px] font-bold mt-3">
            date<span className="text-rose-500">*</span>
          </p>
          <DatePicker
            classNames={{ input: "rounded-none" }}
            placeholder="日付を選択"
            inputFormat="YYYY-MM-DD"
            clearable={true}
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
          />
          <button className="w-full mt-5 h-10 flex items-center justify-center text-md font-bold rounded-full text-white bg-black">
            変更する
          </button>
        </div>
      ) : null}
    </div>
  );
};
