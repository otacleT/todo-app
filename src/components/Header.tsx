import Image from "next/image";
import { AiFillGithub, AiFillTwitterCircle } from "react-icons/ai";

const Header = () => {
    return (
      <header className="w-full shadow-md shadow-black/25">
        <div className="h-[70px] max-w-3xl px-3 mx-auto  flex justify-between items-center">
          <h1>
            <Image
              src="/logo.png"
              layout="intrinsic"
              objectFit="contain"
              width={95}
              height={40}
            />
          </h1>
          <nav>
            <ul className="flex justify-between">
              <li className="px-3">
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
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
}

export default Header