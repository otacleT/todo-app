import dayjs from 'dayjs';
import { getApp, FirebaseApp } from 'firebase/app';
import { FunctionComponent, useState } from 'react';
import { useTasks } from './hooks/firebase.hooks';

export const FirebaseTest: FunctionComponent = () => {
  const app: FirebaseApp = getApp();
  const { isLoading, tasks } = useTasks();

  if (isLoading) return <p>LoadingNow.....</p>;

  return (
    <>
      <ul>
        <li>name = {app.name}</li>
        <li>appId = {app.options.appId}</li>
        <li>apiKey = {app.options.apiKey}</li>
      </ul>
      <ul>
        {tasks.map((task) => {
          const dueDate = dayjs(task.date.toDate());
          return (
            <li key={task.id}>
              {`タイトル: ${task.title},メモ: ${task.detail},${dayjs(
                dueDate.format('YYYY-MM-DD'),
              )}`}
            </li>
          );
        })}
      </ul>
    </>
  );
};
