import { collection, getDocs, getFirestore, doc, setDoc } from "firebase/firestore";

export type Todo = {
  id: string;
  title: string;
  color: string;
  date: Date;
  status: string;
};

export async function getAuthTodos(uid: string | undefined): Promise<Todo[]> {
  const todos = new Array<Todo>();
  const db = getFirestore();
  const todosSnapshot = await getDocs(collection(db, `/users/${uid}/todos`));

  todosSnapshot.forEach((doc) => {
    const todo = doc.data() as Todo;
    todos.push({ ...todo, id: doc.id });
  });

  return todos;
}
