import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import TaskCard from "..//components/TaskCard";
import FilterButton from "../components/FilterButton";
import TaskModal from "../components/TaskModal";
import { auth } from "../firebase/firebaseConfig";
import {
  createTask,
  deleteTask,
  subscribeToTasks,
  updateTask,
} from "../services/taskServices";
//TODO Add Login and Signup functionality with Firebase Authentication
export default function HomeScreen() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user) {
      setTasks([]);
      return;
    }

    const unsubscribe = subscribeToTasks(
      user.uid,
      (firestoreTasks) => {
        setTasks(firestoreTasks);
      },
      (error) => {
        console.error("Error loading tasks: ", error);
      },
    );

    return () => unsubscribe();
  }, [user?.uid]);

  function openAddModal() {
    setEditingTask(null);
    setModalVisible(true);
  }

  function openEditModal(task) {
    setEditingTask(task);
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
    setEditingTask(null);
  }

  async function toggleTask(id) {
    const task = tasks.find((task) => task.id === id);

    if (!tasks) return;

    try {
      await updateTask(id, { completed: !task.completed });
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  }

  async function saveTask(taskData) {
    if (!user) return;

    try {
      if (editingTask) {
        await updateTask(editingTask.id, {
          title: taskData.title,
          category: taskData.category,
          dueDate: taskData.dueDate,
        });
      } else {
        await createTask(taskData, user.uid);
      }
      closeModal();
    } catch (error) {
      console.error("Error saving task", error);
    }
  }

  async function removeTask(id) {
    try {
      await deleteTask(id);
    } catch (error) {
      console.error("Error deleting task", error);
    }
  }

  async function addTask(taskData) {
    if (!user) return;
    try {
      await createTask(taskData, user.uid);
      closeModal();
    } catch (error) {
      console.error("Error adding a task", error);
    }
  }

  function getFilteredTasks() {
    if (filter === "Active") {
      return tasks.filter((task) => !task.completed);
    }
    if (filter === "Completed") {
      return tasks.filter((task) => task.completed);
    }
    return tasks;
  }

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
    setEmail("");
    setPassword("");
  };
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
    setEmail("");
    setPassword("");
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
    setEmail("");
    setPassword("");
  };

  const filteredTasks = getFilteredTasks();
  const remainingTasks = tasks.filter((task) => !task.completed).length;

  if (!user) {
    return (
      <SafeAreaView style={styles.loginContainer}>
        <View>
          <Text style={styles.loginTitle}>My Tasks</Text>
          <Text style={styles.loginSubtitle}>Sign in to continue</Text>
          <TextInput
            style={styles.loginInput}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.loginInput}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Pressable style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Sign In</Text>
          </Pressable>
          <Pressable style={styles.createAccountButton} onPress={handleSignup}>
            <Text style={styles.createAccountButtonText}>
              Create an Account
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>My Tasks</Text>
            <Text style={styles.subtitle}>
              {remainingTasks} tasks remaining
            </Text>
          </View>
          <View>
            <Pressable onPress={handleLogout}>
              <Text>Logout</Text>
            </Pressable>
            <Pressable style={styles.addButton} onPress={openAddModal}>
              <Text style={styles.addButtonText}>+</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.filters}>
          <FilterButton
            title="All"
            active={filter === "All"}
            onPress={() => setFilter("All")}
          />
          <FilterButton
            title="Active"
            active={filter === "Active"}
            onPress={() => setFilter("Active")}
          />
          <FilterButton
            title="Completed"
            active={filter === "Completed"}
            onPress={() => setFilter("Completed")}
          />
        </View>
        <Text style={styles.sectionTitle}>MY TASKS</Text>
        <FlatList
          data={filteredTasks}
          renderItem={({ item }) => (
            <TaskCard
              task={item}
              onToggle={toggleTask}
              onEdit={openEditModal}
              onDelete={deleteTask}
            />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
        {modalVisible && (
          <TaskModal
            visible={modalVisible}
            task={editingTask}
            onClose={() => closeModal()}
            onSave={saveTask}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f8",
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#171717",
  },

  subtitle: {
    fontSize: 13,
    color: "#8a8a8a",
    marginTop: 3,
  },

  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#3478f6",
    justifyContent: "center",
    alignItems: "center",
  },

  addButtonText: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "300",
    marginTop: -6,
  },

  filters: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },

  filterButton: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e7e7e7",
  },

  filterButtonActive: {
    backgroundColor: "#3478f6",
    borderColor: "#3478f6",
  },

  filterText: {
    fontSize: 13,
    color: "#555555",
  },

  filterTextActive: {
    fontSize: 13,
    color: "#ffffff",
  },

  sectionTitle: {
    fontSize: 11,
    fontWeight: "600",
    color: "#999999",
    marginBottom: 10,
  },

  taskCard: {
    minHeight: 72,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    marginBottom: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },

  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#d6d6d6",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  checkboxCompleted: {
    backgroundColor: "#3478f6",
    borderColor: "#3478f6",
  },

  checkmark: {
    color: "#ffffff",
    fontWeight: "700",
  },

  taskContent: {
    flex: 1,
  },

  taskMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 5,
  },

  category: {
    fontSize: 9,
    fontWeight: "700",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    overflow: "hidden",
  },

  schoolCategory: {
    backgroundColor: "#e7efff",
    color: "#3478f6",
  },

  personalCategory: {
    backgroundColor: "#e7f8ec",
    color: "#35a853",
  },

  workCategory: {
    backgroundColor: "#fff2dd",
    color: "#e79b24",
  },

  dueDate: {
    fontSize: 10,
    color: "#aaaaaa",
  },

  taskTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#292929",
  },

  completedText: {
    textDecorationLine: "line-through",
    color: "#aaaaaa",
  },

  chevron: {
    fontSize: 24,
    color: "#bbbbbb",
    marginLeft: 8,
  },
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  loginTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  loginSubtitle: {
    fontSize: 16,
    color: "#668",
    marginBottom: 24,
  },
  loginInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
  },

  loginButton: {
    backgroundColor: "#222",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  createAccountButton: {
    borderWidth: 1,
    borderColor: "#222",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  createAccountButtonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});