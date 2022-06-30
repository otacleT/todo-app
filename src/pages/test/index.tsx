import React, { ChangeEventHandler, useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { Draggable } from "src/components/Draggable";
import { Droppable } from "src/components/Droppable";
import Header from "src/components/Header";
import Head from "next/head";

type Todo = {
  id: number;
  label: string;
  isDone: boolean;
};

const Test = () => {
  const containers = ["A", "B", "C"];
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo>();
  // const [todos, setTodos] = useState<Todo[]>([]);
  const [parent, setParent] = useState(null);
  const draggableMarkup = <Draggable id="draggable" label={todos?.label} />;

  const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setText(e.target.value);
  };
  // const handleAdd = () => {
  //   setTodos((prevTodos) => {
  //     return [...prevTodos, { id: Math.random(), label: text, isDone: false }];
  //   });
  //   setText("");
  // };
  const handleAdd = () => {
    setTodos({ id: Math.random(), label: text, isDone: false });
    setText("");
  };
  return (
    <div>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="Todo App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <h2 className="text-3xl font-bold text-center mt-5">Todo App</h2>
        <DndContext onDragEnd={handleDragEnd}>
          <div className="flex justify-between items-start max-w-6xl mx-auto px-3 mt-10">
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
            <div className="w-[calc(80%-10px)] flex justify-between items-start flex-wrap max-w-6xl mx-auto px-3 mt-10">
              <div className="w-full">
                {parent === null ? draggableMarkup : null}
              </div>
              {containers.map((id) => (
                // We updated the Droppable component so it would accept an `id`
                // prop and pass it to `useDroppable`
                <Droppable key={id} id={id}>
                  {parent === id ? draggableMarkup : "Drop here"}
                </Droppable>
              ))}
            </div>
          </div>
        </DndContext>
      </main>
    </div>
  );

  function handleDragEnd(event: any) {
    const { over } = event;

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? over.id : null);
  }
};

export default Test;
