import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import FilterButton from "@/components/FilterButton";
import NoteCard from "@/components/NoteCard";
import NoteModal from "@/components/NoteModal";
import { Colors, MaxContentWidth, Spacing } from "@/constants/theme";
import { auth } from "@/firebase/firebaseConfig";
import {
  createNote,
  deleteNote,
  setFavorite,
  subscribeToNotes,
  updateNote,
  type Note,
} from "@/services/noteServices";

type Filter = "all" | "favorites";

function getAuthErrorMessage(error: unknown): string {
  const code = (error as { code?: string }).code ?? "";
  switch (code) {
    case "auth/invalid-email":
      return "That email address is not valid.";
    case "auth/email-already-in-use":
      return "An account with this email already exists.";
    case "auth/weak-password":
      return "Password must be at least 6 characters.";
    case "auth/invalid-credential":
    case "auth/user-not-found":
    case "auth/wrong-password":
      return "Incorrect email or password.";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";
    case "auth/network-request-failed":
      return "Network error. Check your connection.";
    default:
      return "Something went wrong. Please try again.";
  }
}

function getTime(note: Note): number {
  // Notes whose server timestamp is still pending are treated as newest.
  return note.createdAt ? note.createdAt.toMillis() : Number.MAX_SAFE_INTEGER;
}

export default function HomeScreen() {
  const scheme = useColorScheme() === "dark" ? "dark" : "light";
  const theme = Colors[scheme];

  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authBusy, setAuthBusy] = useState(false);
  const [authError, setAuthError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [notes, setNotes] = useState<Note[]>([]);
  const [notesLoading, setNotesLoading] = useState(false);
  const [notesError, setNotesError] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const [modalVisible, setModalVisible] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [saving, setSaving] = useState(false);

  // Auth state is the source of truth for signed-in / signed-out rendering.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return unsubscribe;
  }, []);

  // Subscribe to the signed-in user's notes only.
  useEffect(() => {
    if (!user) {
      setNotes([]);
      setNotesError("");
      setNotesLoading(false);
      setFilter("all");
      setModalVisible(false);
      setEditingNote(null);
      return;
    }

    setNotesLoading(true);
    setNotesError("");
    const unsubscribe = subscribeToNotes(
      user.uid,
      (newNotes) => {
        setNotes(newNotes);
        setNotesLoading(false);
      },
      () => {
        setNotesError("Could not load your notes. Please try again later.");
        setNotesLoading(false);
      },
    );
    return unsubscribe;
  }, [user]);

  function validateCredentials(): boolean {
    if (email.trim() === "" || !email.includes("@")) {
      setAuthError("Please enter a valid email address.");
      return false;
    }
    if (password.length < 6) {
      setAuthError("Password must be at least 6 characters.");
      return false;
    }
    return true;
  }

  async function handleAuth(mode: "login" | "signup") {
    if (authBusy) {
      return;
    }
    setAuthError("");
    if (!validateCredentials()) {
      return;
    }
    setAuthBusy(true);
    try {
      if (mode === "signup") {
        await createUserWithEmailAndPassword(auth, email.trim(), password);
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      }
      // No manual navigation: onAuthStateChanged updates the screen.
      setEmail("");
    } catch (error) {
      setAuthError(getAuthErrorMessage(error));
    } finally {
      setPassword("");
      setAuthBusy(false);
    }
  }

  async function handleLogout() {
    try {
      await signOut(auth);
    } catch {
      Alert.alert("Error", "Could not log out. Please try again.");
    }
  }

  function openAddModal() {
    setEditingNote(null);
    setModalVisible(true);
  }

  function openEditModal(note: Note) {
    setEditingNote(note);
    setModalVisible(true);
  }

  function closeModal() {
    if (saving) {
      return;
    }
    setModalVisible(false);
    setEditingNote(null);
  }

  async function handleSave(title: string, content: string) {
    if (saving) {
      return;
    }
    setSaving(true);
    try {
      if (editingNote) {
        await updateNote(editingNote.id, { title, content });
      } else {
        await createNote({ title, content });
      }
      setModalVisible(false);
      setEditingNote(null);
    } catch {
      Alert.alert("Error", "Could not save the note. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleToggleFavorite(note: Note) {
    try {
      await setFavorite(note.id, !note.isFavorite);
    } catch {
      Alert.alert("Error", "Could not update the favorite. Please try again.");
    }
  }

  function handleDelete(note: Note) {
    Alert.alert("Delete note", `Delete "${note.title}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteNote(note.id);
          } catch {
            Alert.alert("Error", "Could not delete the note.");
          }
        },
      },
    ]);
  }

  // Loading screen while Firebase reports the first auth state.
  if (authLoading) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color="#3478f6" />
      </View>
    );
  }

  // Signed-out: only the authentication form is shown.
  if (!user) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <SafeAreaView style={styles.safeArea}>
          <Text style={[styles.title, { color: theme.text }]}>My Notes</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Sign in to continue
          </Text>

          <TextInput
            style={[
              styles.input,
              { color: theme.text, backgroundColor: theme.backgroundElement },
            ]}
            placeholder="Email"
            placeholderTextColor={theme.textSecondary}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            editable={!authBusy}
          />
          <TextInput
            style={[
              styles.input,
              { color: theme.text, backgroundColor: theme.backgroundElement },
            ]}
            placeholder="Password (min. 6 characters)"
            placeholderTextColor={theme.textSecondary}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            editable={!authBusy}
          />

          {authError !== "" && <Text style={styles.errorText}>{authError}</Text>}

          <Pressable
            style={[styles.primaryButton, authBusy && styles.disabled]}
            onPress={() => handleAuth("login")}
            disabled={authBusy}
          >
            {authBusy ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.primaryButtonText}>Sign In</Text>
            )}
          </Pressable>
          <Pressable
            onPress={() => handleAuth("signup")}
            disabled={authBusy}
          >
            <Text style={[styles.linkText, authBusy && styles.disabled]}>
              Create an Account
            </Text>
          </Pressable>
        </SafeAreaView>
      </View>
    );
  }

  // Signed-in: notes interface. The count always uses every owned note.
  const visibleNotes = (
    filter === "favorites" ? notes.filter((note) => note.isFavorite) : notes
  )
    .slice()
    .sort((a, b) => getTime(b) - getTime(a));

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerRow}>
          <View>
            <Text style={[styles.title, { color: theme.text }]}>My Notes</Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              {notes.length} {notes.length === 1 ? "note" : "notes"}
            </Text>
          </View>
          <View style={styles.headerActions}>
            <Pressable onPress={handleLogout} hitSlop={8}>
              <Text style={styles.logoutText}>Logout</Text>
            </Pressable>
            <Pressable
              style={styles.addButton}
              onPress={openAddModal}
              accessibilityLabel="Add note"
            >
              <Text style={styles.addButtonText}>+</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.filterRow}>
          <FilterButton
            title="All Notes"
            active={filter === "all"}
            onPress={() => setFilter("all")}
          />
          <FilterButton
            title="Favorite Notes"
            active={filter === "favorites"}
            onPress={() => setFilter("favorites")}
          />
        </View>

        {notesLoading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#3478f6" />
          </View>
        ) : notesError !== "" ? (
          <Text style={[styles.errorText, styles.messageText]}>
            {notesError}
          </Text>
        ) : (
          <FlatList
            style={styles.list}
            data={visibleNotes}
            keyExtractor={(note) => note.id}
            renderItem={({ item }) => (
              <NoteCard
                note={item}
                onToggleFavorite={handleToggleFavorite}
                onEdit={openEditModal}
                onDelete={handleDelete}
              />
            )}
            ListEmptyComponent={
              <Text
                style={[
                  styles.messageText,
                  { color: theme.textSecondary },
                ]}
              >
                {filter === "favorites"
                  ? "No favorite notes yet."
                  : "No notes yet. Tap + to add one."}
              </Text>
            }
          />
        )}
      </SafeAreaView>

      <NoteModal
        visible={modalVisible}
        note={editingNote}
        saving={saving}
        onClose={closeModal}
        onSave={handleSave}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  safeArea: {
    flex: 1,
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
    gap: Spacing.three,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.three,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e7e7e7",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: "#3478f6",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabled: {
    opacity: 0.6,
  },
  linkText: {
    color: "#3478f6",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
  errorText: {
    color: "#ff4d4f",
    fontSize: 14,
  },
  logoutText: {
    color: "#ff4d4f",
    fontWeight: "bold",
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#3478f6",
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 26,
    lineHeight: 28,
  },
  filterRow: {
    flexDirection: "row",
    gap: Spacing.two,
  },
  list: {
    flex: 1,
  },
  messageText: {
    textAlign: "center",
    marginTop: Spacing.five,
  },
});
