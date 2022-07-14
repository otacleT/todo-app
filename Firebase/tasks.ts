import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { collection, getDocs, getFirestore, FieldValue, doc, setDoc } from 'firebase/firestore';

export type Task = {
  id: string;
  title: string;
  color: string;
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

export async function getAuthTasks(uid: string | undefined): Promise<Task[]> {
  const tasks = new Array<Task>();
  // const auth = getAuth();
  // const user = auth.currentUser;

  // const currentUserId = (user: User | null) => {
  //   if (user) {
  //     const uid = user.uid;
  //     return uid;
  //   } else {
  //     return console.error();
  //   }
  // };
  // const uid = currentUserId(user);
  const db = getFirestore();
  const tasksSnapshot = await getDocs(collection(db, `/users/${uid}/tasks`));

  tasksSnapshot.forEach((doc) => {
    const task = doc.data() as Task;
    tasks.push({ ...task, id: doc.id });
  });

  return tasks;
}

export async function addTasks(task: Task): Promise<void> {
  const db = getFirestore();
  const docRef = doc(db, 'tasks', task.id);

  await setDoc(docRef, { title: task.title, color: task.color }, { merge: true });
}
