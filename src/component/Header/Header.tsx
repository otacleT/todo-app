import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { Auth } from "../Auth";

/**@package */
export const Header: FC = () => {
  return (
    <header className="w-full shadow-md shadow-black/25">
      <div className="h-[70px] max-w-3xl px-3 mx-auto  flex justify-between items-center">
        <Link href="/">
          <a className="text-2xl font-bold">Todo App</a>
        </Link>
        <Auth />
      </div>
    </header>
  );
};
