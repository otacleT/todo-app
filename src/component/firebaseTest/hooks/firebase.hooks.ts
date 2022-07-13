import { useEffect, useState } from 'react';
import { Task, getTasks } from '../../../../Firebase/tasks';

export type UseTasksOutput = {
  isLoading: boolean;
  tasks: Task[];
};

const DEFAULT_OUTPUT: UseTasksOutput = {
  isLoading: true,
  tasks: [],
};

export function useTasks(): UseTasksOutput {
  const [output, setOutput] = useState(DEFAULT_OUTPUT);

  useEffect(() => {
    void (async () => {
      const tasks = await getTasks();
      setOutput({ isLoading: false, tasks });
    })();
  }, []);

  return output;
}
