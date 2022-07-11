import Image from "next/image";
import Link from "next/link";
import { AiFillGithub, AiFillTwitterCircle } from "react-icons/ai";

/**@package */
export const Header = () => {
  return (
    <header className="w-full shadow-md shadow-black/25">
      <div className="h-[70px] max-w-3xl px-3 mx-auto  flex justify-between items-center">
        <h1>
          <Link href="/">
            <a className="text-2xl font-bold">Todo App</a>
          </Link>
        </h1>
        <nav>
          <ul className="flex justify-between items-center">
            {/* <li className="px-3">
              <a
                href="https://github.com/MIYABETaisei"
                target="_black"
                rel="noopenner"
                className="text-3xl"
              >
                <AiFillGithub />
              </a>
            </li>
            <li className="px-3">
              <a
                href="https://twitter.com/otacleT"
                target="_black"
                rel="noopenner"
                className="text-3xl"
              >
                <AiFillTwitterCircle />
              </a>
            </li> */}
            <li className="px-3">
              <a href="/" target="_black" rel="noopenner">
                Login
              </a>
            </li>
            <li className="px-3">
              <a href="/" target="_black" rel="noopenner">
                <Image
                  className="rounded-full"
                  src="/demo.png"
                  width={40}
                  height={40}
                  alt="demo"
                />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
