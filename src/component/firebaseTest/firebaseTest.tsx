import { getApp, FirebaseApp } from 'firebase/app';
import { FunctionComponent, useState } from 'react';
import { useTasks } from './firebase.hooks';

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
          return (
            <li key={task.id}>{`タイトル: ${task.title},メモ: ${
              task.detail
            },${task.date.toDate()}`}</li>
          );
        })}
      </ul>
    </>
  );
};
