import { UniqueIdentifier } from "@dnd-kit/core";
import { FC } from "react";

type Props = {
  id: UniqueIdentifier;
};

/**@package */
export const TodoBlock: FC<Props> = (props) => {
  const { id } = props;

  return (
    <button className="text-md font-bold text-center block border-2 border-gray-300 shadow-lg shadow-black/30 w-full p-2 rounded-md">
      {id}
    </button>
  );
};
