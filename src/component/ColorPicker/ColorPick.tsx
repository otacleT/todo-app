import { FC } from "react";
import { ColorPicker } from "@mantine/core";

type Props = {
  color: string | null;
  handleColor: (e: string) => void;
};

export const ColorPick: FC<Props> = (props) => {
  const { color, handleColor } = props;
  return (
    <>
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
        onChange={handleColor}
      />
      {color ? (
        <p className="text-center text-md font-[14px] leading-[34px] border-[#ced4da] border mt-2">
          {color}
        </p>
      ) : null}
    </>
  );
};
