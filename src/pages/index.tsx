import type { NextPage } from 'next'
import Head from 'next/head'
import { Header } from 'src/component/Header'
import { TodoContainer } from 'src/component/TodoContainer'

const Home: NextPage = () => {
  return (
    <div>
      <main>
        <h2 className='text-3xl font-bold text-center mt-5'>Todo App</h2>
        <TodoContainer />
      </main>
    </div>
  )
}

export default Home
