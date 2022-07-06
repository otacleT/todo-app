import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
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

const Test = () => {
  const [items, setItems] = useState([
    {
      dont: [
        {
          id: "1",
          name: "Clean Car",
          description: "Take the car to get cleaned",
        },
        {
          id: "2",
          name: "Pick up kids",
          description: "Pick up kids and take them to soccer pratice",
        },
        {
          id: "3",
          name: "Walk Dog",
          description: "Meet up with John and take dog for a walk",
        },
      ],
    },
    {
      doing: [{}],
    },
    { did: [{}] },
  ]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const itemIds01 = items[0].dont?.map((item) => item.id);
  const itemIds02 = items[1].doing?.map((item) => item.id);
  const itemIds03 = items[2].did?.map((item) => item.id);
  console.log(itemIds01);
  console.log(itemIds02);
  console.log(itemIds03);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={itemIds01} strategy={verticalListSortingStrategy}>
        {itemIds01.map((id) => (
          <SortableItem key={id} id={id} />
        ))}
      </SortableContext>
    </DndContext>
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = itemIds.indexOf(active.id);
        const newIndex = itemIds.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
};

export default Test;
