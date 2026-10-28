import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { auth, db } from "@/firebase/firebaseConfig";

export type Note = {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
  isFavorite: boolean;
};

export type NoteInput = {
  title: string;
  content: string;
};

const notesCollection = collection(db, "notes");

// Returns the signed-in user's UID or throws if nobody is signed in.
function requireUserId(): string {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("You must be signed in.");
  }
  return user.uid;
}

// Confirms the note exists and belongs to the signed-in user.
// The Firestore rules enforce this on the server as well.
async function getOwnedNoteRef(noteId: string) {
  const userId = requireUserId();
  const noteRef = doc(db, "notes", noteId);
  const snapshot = await getDoc(noteRef);
  if (!snapshot.exists() || snapshot.data().userId !== userId) {
    throw new Error("Note not found.");
  }
  return noteRef;
}

export async function createNote(noteData: NoteInput): Promise<void> {
  const userId = requireUserId();
  await addDoc(notesCollection, {
    title: noteData.title,
    content: noteData.content,
    userId,
    isFavorite: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export function subscribeToNotes(
  userId: string,
  callback: (notes: Note[]) => void,
  onError: (error: Error) => void,
): () => void {
  const q = query(notesCollection, where("userId", "==", userId));
  return onSnapshot(
    q,
    (snapshot) => {
      const notes = snapshot.docs.map((document) => {
        const data = document.data();
        return {
          id: document.id,
          title: data.title ?? "",
          content: data.content ?? "",
          userId: data.userId,
          createdAt: data.createdAt ?? null,
          updatedAt: data.updatedAt ?? null,
          isFavorite: data.isFavorite === true,
        } as Note;
      });
      callback(notes);
    },
    onError,
  );
}

// Only title, content and updatedAt change; createdAt and userId are untouched.
export async function updateNote(
  noteId: string,
  noteData: NoteInput,
): Promise<void> {
  const noteRef = await getOwnedNoteRef(noteId);
  await updateDoc(noteRef, {
    title: noteData.title,
    content: noteData.content,
    updatedAt: serverTimestamp(),
  });
}

export async function setFavorite(
  noteId: string,
  isFavorite: boolean,
): Promise<void> {
  const noteRef = await getOwnedNoteRef(noteId);
  await updateDoc(noteRef, {
    isFavorite,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteNote(noteId: string): Promise<void> {
  const noteRef = await getOwnedNoteRef(noteId);
  await deleteDoc(noteRef);
}
