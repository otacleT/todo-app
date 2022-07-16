import { ChangeEventHandler, FC } from "react";

type Props = {
  text: string;
  handleInput: ChangeEventHandler<HTMLInputElement>;
};

export const InputTitle: FC<Props> = (props) => {
  const { text, handleInput } = props;
  return (
    <>
      <p className="text-[14px] font-bold">
        title<span className="text-rose-500">*</span>
      </p>
      <input
        className="w-full border border-[#ced4da] leading-[34px] px-[12px] rounded-sm text-[14px]"
        value={text}
        onChange={handleInput}
        type="text"
        placeholder="勉強する"
      />
    </>
  );
};
