import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const tasksCollection = collection(db, "tasks");

export async function createTask(taskData, userId) {
  const { title, category, dueDate } = taskData;
  await addDoc(tasksCollection, {
    title,
    category,
    dueDate,
    completed: false,
    userId,
    createdAt: serverTimestamp(),
  });
}

export function subscribeToTasks(userId, callback, onError) {
  const q = query(tasksCollection, where("userId", "==", userId));

  return onSnapshot(
    q,
    (snapshot) => {
      const tasks = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      callback(tasks);
    },
    onError,
  );
}

export async function updateTask(taskId, updates) {
  const taskRef = doc(db, "tasks", taskId);
  await updateDoc(taskRef, updates);
}

export async function deleteTask(taskId) {
  const taskRef = doc(db, "tasks", taskId);
  await deleteDoc(taskRef);
}