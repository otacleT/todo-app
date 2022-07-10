import React, { useState } from "react";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
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

const Test02 = () => {
  // const [items, setItems] = useState(["1", "2", "3"]);
  // const [items, setItems] = useState([
  //   { id: Math.round(Math.random() * 100000), title: "aiueo" },
  //   { id: Math.round(Math.random() * 100000), title: "kakikukeko" },
  //   { id: Math.round(Math.random() * 100000), title: "sasisuseso" },
  // ]);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>();
  const [items, setItems] = useState<Props>({
    todo: [
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
    done: [
      {
        id: Math.round(Math.random() * 100000),
        title: "完了０１",
        date: new Date(),
      },
    ],
  });
  const array = Object.keys(items);
  for (const x of array) {
    if (items[x].find((item) => item.title === "予定０１")) {
      console.log(x);
    }
  }
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        id="kgayhuugai"
        items={items.todo}
        strategy={verticalListSortingStrategy}
      >
        {items.todo.map((id) => (
          <SortableItem key={id.id} id={id.id} title={id.title} />
        ))}
      </SortableContext>
      <SortableContext
        id="fjkaolgujai0p"
        items={items.doing}
        strategy={verticalListSortingStrategy}
      >
        {items.doing.map((id) => (
          <SortableItem key={id.id} id={id.id} title={id.title} />
        ))}
      </SortableContext>
      <SortableContext
        id="faliga"
        items={items.done}
        strategy={verticalListSortingStrategy}
      >
        {items.done.map((id) => (
          <SortableItem key={id.id} id={id.id} title={id.title} />
        ))}
      </SortableContext>
      <DragOverlay>
        {activeId ? <SortableItem id={activeId} /> : null}
      </DragOverlay>
    </DndContext>
  );
  function findContainer(id: UniqueIdentifier) {
    if (id in items) {
      return id;
    }
    // console.log(Object.keys(items));
    // console.log(Object.keys(items).find((key) => items[key].includes(id)));
    // return Object.keys(items).find((key) => items[key].includes(id));
    const array = Object.keys(items);
    for (const x of array) {
      if (items[x].find((item) => item.id === id)) {
        return x;
      }
    }
  }
  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const { id } = active;

    setActiveId(id);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    const { id } = active;
    if (!over) {
      return;
    }
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
      // for (const x of activeItems) {
      //   if (activeItems.find((item) => item.id === id)) {
      //     const activeItems = x;
      //     return;
      //   }
      // }
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
    if (!over) {
      return;
    }
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
    console.log(activeIndex);
    console.log(overIndex);

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

export default Test02;
