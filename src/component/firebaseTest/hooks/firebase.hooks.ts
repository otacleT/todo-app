import { useEffect, useState } from 'react';
import { Task, getTasks, getAuthTasks } from '../../../../Firebase/tasks';
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
  // const [currentTodo, setCurretTodo] = useState<Task[]>([]);
  // const [currentDoing, setCurretDoing] = useState({});
  // const [currentDone, setCurretDone] = useState({});
  const { userId } = useAuthState();

  useEffect(() => {
    void (async () => {
      const tasks = await getAuthTasks(userId);

      const todos = new Array<Task>();
      const doings = new Array<Task>();
      const dones = new Array<Task>();

      tasks.forEach((task) => {
        if (task.status === 'Todo') {
          todos.push(task);
        } else if (task.status === 'Doing') {
          doings.push(task);
        } else {
          dones.push(task);
        }
      });
      setOutput({ isLoading: false, todos: todos, doings: doings, dones: dones });
    })();
  }, [userId]);

  return output;
}
