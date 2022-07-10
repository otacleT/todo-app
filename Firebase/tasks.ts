import { collection, getDocs, getFirestore } from 'firebase/firestore';

export type Task = {
  id: string;
  title: string;
  detail: string;
  date: any;
};

export async function getTasks(): Promise<Task[]> {
  const tasks = new Array<Task>();
  const db = getFirestore();
  const tasksSnapshot = await getDocs(collection(db, '/tasks'));

  tasksSnapshot.forEach((doc) => {
    const task = doc.data() as Task;
    tasks.push({ ...task, id: doc.id });
  });

  return tasks;
}
