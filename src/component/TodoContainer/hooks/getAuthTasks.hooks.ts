import { useEffect, useState } from 'react';
import { Task, getAuthTasks } from '../../../../Firebase/tasks';
import { useAuthState } from 'src/component/Header/hooks/authentication';

export type UseTasksOutput = {
  isLoading: boolean;
  todos: Task[];
  doings: Task[];
  dones: Task[];
};

const DEFAULT_OUTPUT: UseTasksOutput = {
  isLoading: true,
  todos: [],
  doings: [],
  dones: [],
};

export function useTasks(): UseTasksOutput {
  const [output, setOutput] = useState(DEFAULT_OUTPUT);
  const { userId } = useAuthState();

  useEffect(() => {
    void (async () => {
      const tasks = await getAuthTasks(userId);

      const todos = new Array<Task>();
      const doings = new Array<Task>();
      const dones = new Array<Task>();

      tasks.forEach((task) => {
        if (task.status === 'todo') {
          task.date = task.date.toDate();
          todos.push(task);
        } else if (task.status === 'doing') {
          task.date = task.date.toDate();
          doings.push(task);
        } else {
          task.date = task.date.toDate();
          dones.push(task);
        }
      });
      setOutput({ isLoading: false, todos: todos, doings: doings, dones: dones });
    })();
  }, [userId]);

  return output;
}
