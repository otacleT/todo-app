import React, { useState } from "react";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
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
import SortableItem from "../component/Test02";

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
  const [activeId, setActiveId] = useState();
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
  // const [items, setItems] = useState([
  //   { key1: 1, key2: 2, key3: 3 },
  //   { key1: 1, key2: 2, key3: 3 },
  // ]);

  // console.log(Object.values(items));
  // const array = console.log(Object.values(items.dont).map((item) => item.id));
  // entories.log(Object.values(items).map((item) => Object.keys(item)));
  // const test = Object.keys(items);
  // let testes;
  // console.log(test);
  // console.log(test.forEach((item) => Object.values(items[item])));
  // const oldIndex = Object.values(items).forEach((item) => {
  //   if (
  //     item.findIndex((item02) => {
  //       item02.title === "進行中０１";
  //       testes = item02;
  //     })
  //   ) {
  //   }
  // return item.findIndex((item02) => item02.title === "進行中０１");
  // });
  // console.log(testes);

  // console.log(Object.keys(items).forEach((key) => key));
  // console.log(Object.values(items).map((elem) => elem));
  // console.log(items.map((item) => item.id));
  // console.log(items.filter((item) => item.id > 1000));

  // const test = Object.values(items).map((item) => item.id);
  // console.log(test);

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
        items={items.dont}
        strategy={verticalListSortingStrategy}
      >
        {items.dont.map((id) => (
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
        items={items.did}
        strategy={verticalListSortingStrategy}
      >
        {items.did.map((id) => (
          <SortableItem key={id.id} id={id.id} title={id.title} />
        ))}
      </SortableContext>
      <DragOverlay>
        {activeId ? <SortableItem id={activeId} /> : null}
      </DragOverlay>
    </DndContext>
  );
  // function handleDragEnd(event: DragEndEvent) {
  //   const { active, over } = event;

  //   if (active.id !== over?.id) {
  //     setItems((items) => {
  //       // const oldIndex = items.indexOf(active.id);
  //       // const newIndex = items.indexOf(over.id);
  //       // const oldIndex = items.findIndex((item) => item.id === active.id);
  //       // const newIndex = items.findIndex((item) => item.id === over?.id);
  //       const oldIndex = Object.values(items).map((item) => {
  //         return item.findIndex((item02) => item02.id === over?.id);
  //       });
  //       const newIndex = Object.values(items).map((elem) =>
  //         elem.findIndex((item) => item.id === over?.id)
  //       );
  //       const oldIndex02 = oldIndex[0];
  //       const newIndex02 = newIndex[0];

  //       return arrayMove(items, oldIndex, newIndex);
  //     });
  //   }
  // }
  function findContainer(id) {
    if (id in items) {
      return id;
    }
    // console.log(Object.keys(items));
    // console.log(Object.keys(items).find((key) => items[key].includes(id)));

    return Object.keys(items).find((key) => items[key].includes(id));
  }
  function handleDragStart(event) {
    const { active } = event;
    const { id } = active;
    console.log("ok");

    setActiveId(id);
  }
  function handleDragOver(event) {
    const { active, over, draggingRect } = event;
    const { id } = active;
    const { id: overId } = over;
    console.log("ok2");

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
  function handleDragEnd(event) {
    const { active, over } = event;
    const { id } = active;
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
