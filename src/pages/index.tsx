import type { NextPage } from 'next';
import Head from 'next/head';
import { Header } from 'src/component/Header';
import { TodoContainer } from 'src/component/TodoContainer';

const Home: NextPage = () => {
  return (
    <div>
      <main>
        <TodoContainer />
      </main>
    </div>
  );
};

export default Home;
