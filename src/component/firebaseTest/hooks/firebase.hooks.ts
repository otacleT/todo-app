import { useEffect, useState } from 'react';
import { Task, getTasks, getAuthTasks } from '../../../../Firebase/tasks';
import { useAuthState } from 'src/component/Header/hooks/authentication';

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
  const { userId } = useAuthState();

  useEffect(() => {
    void (async () => {
      const tasks = await getAuthTasks(userId);
      setOutput({ isLoading: false, tasks });
    })();
  }, [userId]);

  return output;
}
