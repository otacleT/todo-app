import type { NextPage } from "next";
import Head from "next/head";
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
        <TodoContainer />
      </main>
    </div>
  );
};

export default Home;
