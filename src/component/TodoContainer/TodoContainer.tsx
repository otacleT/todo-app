import React, { useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  DragOverEvent,
  DragStartEvent,
  UniqueIdentifier,
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { TodoList } from "../TodoList";
import { AddTodo } from "../Addtodo";
import { TodoBlock } from "../TodoBlock";

type Props = {
  [key: string]: { id: UniqueIdentifier; title: string; date: Date }[];
};

export const TodoContainer = () => {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>();
  const [items, setItems] = useState<Props>({
    dont: [{ id: Math.random(), title: "title", date: new Date() }],
    doing: [],
    did: [],
  });
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  return (
    <div className="flex justify-between max-w-6xl mx-auto px-3 mt-10">
      <AddTodo setItems={setItems} />
      <div className="flex justify-between w-[calc(80%-20px)] border-2 border-black rounded-xl py-1 px-[9px]">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <TodoList label="Don't" id="dont" list={items.dont} />
          <TodoList label="Doing" id="doing" list={items.doing} />
          <TodoList label="Did" id="did" list={items.did} />
          <DragOverlay>
            {activeId ? <TodoBlock item={activeId} /> : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );

  function findContainer<T>(id: T) {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key) => items[key].includes(id));
  }
  //   掴んだ要素をアクティブにする
  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id);
  }

  function handleDragOver(event: DragOverEvent) {
    // const { active, over, draggingRect } = event;
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over;

    // Find the containers
    const activeContainer = findContainer<UniqueIdentifier>(id);
    const overContainer = findContainer<any>(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setItems((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems.indexOf(id);
      const overIndex = overItems.indexOf(overId);

      let newIndex;
      if (overId in prev) {
        // We're at the root droppable of a container
        newIndex = overItems.length + 1;
      } else {
        const isBelowLastItem = over && overIndex === overItems.length - 1;

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => item.title !== active.id),
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          items[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length),
        ],
      };
    });
  }

  function handleDragEnd(event: DragOverEvent) {
    const { active, over } = event;
    const id: any = active;
    const { id: overId } = over;

    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = items[activeContainer].indexOf(id);
    const overIndex = items[overContainer].indexOf(overId);

    if (activeIndex !== overIndex) {
      setItems((items) => ({
        ...items,
        [overContainer]: arrayMove(
          items[overContainer],
          activeIndex,
          overIndex
        ),
      }));
    }

    setActiveId(null);
  }
};
