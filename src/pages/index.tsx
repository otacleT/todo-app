import type { NextPage } from "next";
import { TodoContainer } from "src/component/TodoContainer";

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
