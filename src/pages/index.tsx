import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Header } from "src/component/Header";
import { TodoContainer } from "src/component/TodoContainer";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="Todo App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <h2 className="text-3xl font-bold text-center mt-5">Todo App</h2>
        {/* <Link href="/test">
          <a>Test page</a>
        </Link> */}
        <TodoContainer />
      </main>
    </div>
  );
};

export default Home;
