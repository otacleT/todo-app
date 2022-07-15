import dayjs from 'dayjs';
import { getApp, FirebaseApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import {
  collection,
  getDocs,
  getFirestore,
  FieldValue,
  doc,
  addDoc,
  Timestamp,
} from 'firebase/firestore';
import { FunctionComponent, useState, useEffect, useCallback } from 'react';
import { useAuthState } from '../Header/hooks/authentication';
import { useTasks } from './hooks/firebase.hooks';

export const FirebaseTest: FunctionComponent = () => {
  const app: FirebaseApp = getApp();
  const { isLoading, todos, doings, dones } = useTasks();
  const { userId } = useAuthState();

  const handleSubmit = useCallback(async () => {
    const db = getFirestore();
    const docRef = collection(db, `users/${userId}/tasks`);

    const testTime = new Date('2017/03/02 01:23:45');

    const convertTimeStamp = Timestamp.fromDate(testTime);
    console.log('たかはし');
    await addDoc(docRef, {
      title: 'レートチェック',
      color: '#3cb371',
      status: 'Todo',
      date: convertTimeStamp,
    });
  }, [userId]);

  if (isLoading) return <p>LoadingNow.....</p>;

  return (
    <>
      <ul>
        <li>name = {app.name}</li>
        <li>appId = {app.options.appId}</li>
        <li>apiKey = {app.options.apiKey}</li>
      </ul>
      <ul>
        {todos.map((task) => {
          const dueDate = dayjs(task.date.toDate());
          return (
            <li key={task.id} style={{ color: `${task.color}` }}>
              {`タイトル: ${task.title},メモ: ${task.color},${dayjs(dueDate.format('YYYY-MM-DD'))}`}
            </li>
          );
        })}
      </ul>
      <div>--------</div>
      <ul>
        {dones.map((task) => {
          const dueDate = dayjs(task.date.toDate());
          return (
            <li key={task.id} style={{ color: `${task.color}` }}>
              {`タイトル: ${task.title},メモ: ${task.color},${dayjs(dueDate.format('YYYY-MM-DD'))}`}
            </li>
          );
        })}
      </ul>
      <button
        className='shadow-lg bg-emerald-500 shadow-emerald-500/50 text-white rounded px-2 py-1'
        onClick={handleSubmit}
      >
        登録
      </button>
    </>
  );
};
