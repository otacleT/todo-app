import { DndContext } from "@dnd-kit/core";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { ChangeEventHandler } from "react";
import { useState } from "react";
import Draggable from "src/components/Draggable";
import Droppable from "src/components/Droppable";
import Header from "src/components/Header";

type Todo = {
  id: number;
  label: string;
  isDone: boolean;
};

const Home: NextPage = () => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const containers = ["A", "B", "C", "D"];
  const [parent, setParent] = useState(null);
  const draggableMarkup = <Draggable id="draggable">Drag me</Draggable>;
  const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setText(e.target.value);
  };
  const handleAdd = () => {
    setTodos((prevTodos) => {
      return [...prevTodos, { id: Math.random(), label: text, isDone: false }];
    });
    setText("");
  };
  const handleDragEnd = (event: any) => {
    const { over } = event;

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? over.id : null);
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
        <Link href="/test">
          <a className="text-xl font-bold mt-4 ">Draggable test</a>
        </Link>
        <div className="flex justify-between max-w-6xl mx-auto px-3 mt-10">
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
          {/* <DndContext onDragEnd={handleDragEnd}>
            <Draggable id="draggable">Draggable item</Draggable>
            <div className="flex justify-between w-[calc(80%-20px)] border-2 border-black rounded-xl p-1">
              <div className="w-[calc(100%/3-10px)]">
                <h3 className="text-xl font-bold text-center">Don't</h3>
                <Droppable id="dont"> */}
          {/* {todos?.map((item) => {
                    return (
                      <Draggable key={item.id} id={item.id}>
                        {item.label}
                      </Draggable>
                    );
                  })} */}
          {/* </Droppable>
              </div>
              <div className="w-[calc(100%/3-10px)]">
                <h3 className="text-xl font-bold text-center">Doing</h3>
                <Droppable id="doing"></Droppable>
              </div>
              <div className="w-[calc(100%/3-10px)]">
                <h3 className="text-xl font-bold text-center">Did</h3>
                <Droppable id="did"></Droppable>
              </div>
            </div>
          </DndContext> */}
          <DndContext onDragEnd={handleDragEnd}>
            {parent === null ? draggableMarkup : null}

            <div className="max-w-3xl flex justify-between mx-auto flex-wrap">
              {containers.map((id) => (
                // We updated the Droppable component so it would accept an `id`
                // prop and pass it to `useDroppable`
                <Droppable key={id} id={id}>
                  {parent === id ? draggableMarkup : "Drop here"}
                </Droppable>
              ))}
            </div>
          </DndContext>
        </div>
      </main>
    </div>
  );
};

export default Home;
