import dayjs from 'dayjs';
import { getApp, FirebaseApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { FunctionComponent, useState, useEffect } from 'react';
import { useTasks } from './hooks/firebase.hooks';

export const FirebaseTest: FunctionComponent = () => {
  const app: FirebaseApp = getApp();
  const { isLoading, todos, doings, dones } = useTasks();

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
    </>
  );
};
