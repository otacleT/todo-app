import { FC } from "react";
import { Draggable } from "./Draggable";

type Props = {
  id: string;
  body: string;
};

const Dragitem: FC<Props> = (props) => {
  return <Draggable id={props.id}>{props.body}</Draggable>;
};

export default Dragitem;
