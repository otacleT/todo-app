import dayjs from "dayjs";
import { getApp, FirebaseApp } from "firebase/app";
import {
  collection,
  getDocs,
  getFirestore,
  FieldValue,
  doc,
  addDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { FunctionComponent, useState, useEffect, useCallback } from "react";
import ApiCalendar from "react-google-calendar-api";
import { useAuthState } from "../Header/hooks/authentication";
import { useTasks } from "./hooks/firebase.hooks";

export const FirebaseTest: FunctionComponent = () => {
  const [events, setEvents] = useState<any>([]);
  const app: FirebaseApp = getApp();
  const { isLoading, todos, doings, dones } = useTasks();
  const { userId } = useAuthState();

  const handleSubmit = useCallback(async () => {
    const db = getFirestore();
    const docRef = collection(db, `users/${userId}/tasks`);

    const testTime = new Date("2017/03/02 01:23:45");

    const convertTimeStamp = Timestamp.fromDate(testTime);
    console.log("たかはし");
    await addDoc(docRef, {
      title: "レートチェック",
      color: "#3cb371",
      status: "Todo",
      date: convertTimeStamp,
    });
  }, [userId]);

  const handleUpdate = useCallback(async () => {
    const db = getFirestore();
    const testId = "9454507";
    const docRef = doc(db, `users/${userId}/tasks`, testId);

    const testTime = new Date("2017/03/02 01:23:45");

    const convertTimeStamp = Timestamp.fromDate(testTime);
    console.log("たかはし");
    await updateDoc(docRef, {
      status: "Doing",
    });
  }, [userId]);

  const config = {
    clientId: "600602904532-u8bbfn3c0fmat4kck4eresateda1su2r.apps.googleusercontent.com",
    apiKey: "AIzaSyC9c-o43A0dXHo1Vzu_kuIKPYwmvxH6zWw",
    scope: "https://www.googleapis.com/primary/calendar",
    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
  };

  const calendarID = process.env.NEXT_PUBLIC_CALENDAR_ID;
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const accessToken = process.env.NEXT_PUBLIC_GOOGLE_ACCESS_TOKEN;

  const getEvents = async (calendarID: any, apiKey: any) => {
    const gapi = await import("gapi-script").then((pack) => pack.gapi);

    function initiate() {
      gapi.client
        .init({
          apiKey: apiKey,
        })
        .then(function () {
          return gapi.client.request({
            path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
          });
        })
        .then(
          (response: any) => {
            let events = response.result.items;
            setEvents(events);
            return events;
          },
          function (err: any) {
            return [false, err];
          },
        );
    }

    await gapi.load("client", initiate);
  };

  useEffect(() => {
    getEvents(calendarID, apiKey);
  }, []);

  const addEvent = async (calendarID: any, event: any) => {
    const gapi = await import("gapi-script").then((pack) => pack.gapi);

    function initiate() {
      gapi.client
        .request({
          path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
          method: "POST",
          body: event,
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(
          (response: any) => {
            return [true, response];
          },
          function (err: any) {
            console.log(err);
            return [false, err];
          },
        );
    }
    gapi.load("client", initiate);
  };

  const calenderTask = {
    summary: "Hello World",
    location: "",
    start: {
      dateTime: "2022-08-28T09:00:00-07:00",
    },
    end: {
      dateTime: "2022-08-28T17:00:00-07:00",
    },
    recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
    attendees: [],
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 10 },
      ],
    },
  };

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
              {`タイトル: ${task.title},メモ: ${task.color},${dayjs(dueDate.format("YYYY-MM-DD"))}`}
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
              {`タイトル: ${task.title},メモ: ${task.color},${dayjs(dueDate.format("YYYY-MM-DD"))}`}
            </li>
          );
        })}
      </ul>
      <button
        className="shadow-lg bg-emerald-500 shadow-emerald-500/50 text-white rounded px-2 py-1"
        onClick={handleSubmit}
      >
        登録
      </button>
      <button
        className="shadow-lg bg-emerald-500 shadow-emerald-500/50 text-white rounded px-2 py-1"
        onClick={handleUpdate}
      >
        アプデ
      </button>
      <button
        className="shadow-lg bg-emerald-500 shadow-emerald-500/50 text-white rounded px-2 py-1"
        onClick={() => addEvent(calendarID, calenderTask)}
      >
        Goooooooogle
      </button>
      <div>
        <ul>
          {events?.map((event: any) => (
            <li key={event.id} className="flex justify-center">
              タスク名:{event.summary}
              終わり時間: {event.end.date}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
