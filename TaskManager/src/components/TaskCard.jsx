import { Pressable, StyleSheet, Text, View } from "react-native";

export default function TaskCard({ task, onToggle }) {
  function getCategoryStyle(category) {
    if (category === "School") {
      return styles.schoolCategory;
    }
    if (category === "Personal") {
      return styles.personalCategory;
    }

    return styles.workCategory;
  }
  return (
    <View style={styles.taskCard}>
      <Pressable
        style={[styles.checkbox, task.completed && styles.checkboxCompleted]}
        onPress={() => onToggle(task.id)}
      >
        {task.completed && <Text style={styles.checkmark}>✓</Text>}
      </Pressable>

      <View style={styles.taskContent}>
        <View style={styles.taskMeta}>
          <Text style={[styles.category, getCategoryStyle(task.category)]}>
            {task.category.toUpperCase()}
          </Text>

          <Text style={styles.dueDate}>Due: {task.dueDate}</Text>
        </View>

        <Text
          style={[styles.taskTitle, task.completed && styles.completedText]}
        >
          {task.title}
        </Text>
      </View>

      <Text style={styles.chevron}>›</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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