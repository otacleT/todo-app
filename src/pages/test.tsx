import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragStartEvent,
  UniqueIdentifier,
  DragOverEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "src/component/Test";

type Props = {
  [key: string]: { id: UniqueIdentifier; title: string; date: Date }[];
};

const Test = () => {
  const [activeId, setActiveId] = useState<UniqueIdentifier>();
  const [items, setItems] = useState<Props>({
    dont: [
      {
        id: Math.round(Math.random() * 100000),
        title: "予定０１",
        date: new Date(),
      },
      {
        id: Math.round(Math.random() * 100000),
        title: "予定０２",
        date: new Date(),
      },
    ],
    doing: [
      {
        id: Math.round(Math.random() * 100000),
        title: "進行中０１",
        date: new Date(),
      },
    ],
    did: [
      {
        id: Math.round(Math.random() * 100000),
        title: "完了０１",
        date: new Date(),
      },
    ],
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div className="flex justify-between w-[calc(80%-20px)] border-2 border-black rounded-xl pt-3 pb-5 px-[9px]">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        // センサーの起動条件を満たしたときに、ピックアップされたドラッグ可能な要素の識別子と共に発生
        onDragStart={handleDragStart}
        // ドラッグ可能なアイテムがドロップ可能なコンテナの上に移動したときに、コンテナの識別子とともに発生
        onDragOver={handleDragOver}
        // ドラッグ可能なアイテムがドロップされたときにドロップ可能なコンテナの上にあったのか
        onDragEnd={handleDragEnd}
      >
        <div className="w-[calc(33%-5px)]">
          <SortableContext
            id="dont"
            items={items.dont}
            strategy={verticalListSortingStrategy}
          >
            {items.dont.map((id) => {
              return (
                <div key={id.id}>
                  <SortableItem
                    key={id.id}
                    id={id.id}
                    title={id.title}
                    date={id.date}
                  />
                </div>
              );
            })}
          </SortableContext>
        </div>
        <div className="w-[calc(33%-5px)]">
          <SortableContext
            id="doing"
            items={items.doing}
            strategy={verticalListSortingStrategy}
          >
            {items.doing.map((id) => {
              return (
                <div key={id.id}>
                  <SortableItem
                    key={id.id}
                    id={id.id}
                    title={id.title}
                    date={id.date}
                  />
                </div>
              );
            })}
          </SortableContext>
        </div>
        <div className="w-[calc(33%-5px)]">
          <SortableContext
            id="did"
            items={items.did}
            strategy={verticalListSortingStrategy}
          >
            {items.did.map((id) => {
              return (
                <div key={id.id}>
                  <SortableItem
                    key={id.id}
                    id={id.id}
                    title={id.title}
                    date={id.date}
                  />
                </div>
              );
            })}
          </SortableContext>
        </div>
        <DragOverlay>
          {activeId ? <SortableItem id={activeId} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );

  function findContainer(id: UniqueIdentifier) {
    if (id in items.dont) {
      return id;
    }
    // 特定のidをバリューに持つオブジェクトを含むキーを取得したい
    const test = Object.keys(items).forEach((elem) => {
      // console.log(items[elem]);
      Object.values(items[elem]).forEach((elem2) => {
        // console.log(elem2);
        if (elem2.id === id) {
          return;
        }
      });
      return elem;
    });
    return test;
  }

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const { id } = active;

    setActiveId(id);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over, draggingRect } = event;
    const { id } = active;
    if (over === null) return;
    const { id: overId } = over;

    // Find the containers
    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

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
        const isBelowLastItem =
          over &&
          overIndex === overItems.length - 1 &&
          draggingRect.offsetTop > over.rect.offsetTop + over.rect.height;

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => item !== active.id),
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          items[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length),
        ],
      };
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    const { id } = active;
    if (over === null) return;
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

    const activeIndex = items[activeContainer].indexOf(active.id);
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

export default Test;
