import { useEffect, useState } from "react";
import { getAuthTodos, Todo } from "src/lib/Todos";
import { useUser } from "./useAuth";

type setTodo = {
  isLoading: boolean;
  todos: Todo[];
  doings: Todo[];
  dones: Todo[];
};

const DEFAULT_OUTPUT = {
  isLoading: true,
  todos: [],
  doings: [],
  dones: [],
};

export function useTodos(): setTodo {
  const user = useUser();
  const [output, setOutput] = useState<setTodo>(DEFAULT_OUTPUT);
  useEffect(() => {
    void (async () => {
      const dbTodos = await getAuthTodos(user?.uid);

      const todos = new Array<Todo>();
      const doings = new Array<Todo>();
      const dones = new Array<Todo>();

      dbTodos.forEach((todo) => {
        if (todo.status === "todo") {
          todo.date = todo.date;
          todos.push(todo);
        } else if (todo.status === "doing") {
          todo.date = todo.date;
          doings.push(todo);
        } else {
          todo.date = todo.date;
          dones.push(todo);
        }
      });
      setOutput({ isLoading: false, todos: todos, doings: doings, dones: dones });
    })();
  }, [user]);

  return output;
}
