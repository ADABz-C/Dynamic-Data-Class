import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TaskCard from "..//components/TaskCard";
import FilterButton from "../components/FilterButton";
import TaskModal from "../components/TaskModal";

//TODO add login and sign up functionality with Firebase Authentication
export default function HomeScreen() {
  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Finish N322 grading",
      category: "School",
      dueDate: "Today",
      completed: false,
    },
    {
      id: "2",
      title: "Pick up groceries",
      category: "Personal",
      dueDate: "Today",
      completed: false,
    },
    {
      id: "3",
      title: "Review lecture slides",
      category: "School",
      dueDate: "Today",
      completed: true,
    },
    {
      id: "4",
      title: "Work on website",
      category: "Work",
      dueDate: "Friday",
      completed: false,
    },
    {
      id: "5",
      title: "Work on book",
      category: "Personal",
      dueDate: "Friday",
      completed: false,
    },
  ]);

  const [filter, setFilter] = useState("All");
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

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

  function toggleTask(id) {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      }),
    );
  }

  function saveTask(taskData) {
    if (editingTask) {
      setTasks(
        tasks.map((task) => {
          if (task.id === editingTask.id) {
            return {
              ...task,
              title: taskData.title,
              category: taskData.category,
              dueDate: taskData.dueDate,
            };
          }
          return task;
        }),
      );
    } else {
      const newTask = {
        id: Date.now().toString(),
        title: taskData.title,
        category: taskData.category,
        dueDate: taskData.dueDate,
        completed: false,
      };
      setTasks([...tasks, newTask]);
    }
    closeModal();
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function addTask(taskData) {
    const newTask = {
      id: Date.now().toString(),
      title: taskData.title,
      category: taskData.category,
      dueDate: taskData.dueDate,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setModalVisible(false);
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

  const filteredTasks = getFilteredTasks();
  const remainingTasks = tasks.filter((task) => !task.completed).length;

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

          <Pressable
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addButtonText}>+</Text>
          </Pressable>
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
});
