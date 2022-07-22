import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

/**@package */
export const Header: FC = () => {
  return (
    <header className="w-full shadow-md shadow-black/25">
      <div className="h-[70px] max-w-3xl px-3 mx-auto  flex justify-between items-center">
        <Link href="/">
          <a className="text-2xl font-bold">Todo App</a>
        </Link>
        <nav>
          <ul className="flex justify-between items-center">
            <li className="px-3">
              <Link href="/">
                <a target="_black" rel="noopenner">
                  <Image
                    className="rounded-full"
                    src="/demo.png"
                    width={40}
                    height={40}
                    alt="demo"
                  />
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
