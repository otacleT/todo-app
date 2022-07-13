import { collection, getDocs, getFirestore, FieldValue, doc, setDoc } from 'firebase/firestore';

export type Task = {
  id: string;
  title: string;
  detail: string;
  //   date: FieldValue;
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

export async function addTasks(task: Task): Promise<void> {
  const db = getFirestore();
  const docRef = doc(db, 'tasks', task.id);

  await setDoc(docRef, { title: task.title, detail: task.detail }, { merge: true });
}
