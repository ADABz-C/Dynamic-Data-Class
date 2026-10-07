import { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function TaskModal({ visible, task, onClose, onSave }) {
  const [title, setTitle] = useState(task ? task.title : "");
  const [category, setCategory] = useState(task ? task.category : "");
  const [dueDate, setDueDate] = useState(task ? task.dueDate : "");

  function handleSave() {
    if (!title.trim()) return;
    onSave({
      title: title.trim(),
      category,
      dueDate: dueDate.trim() || "Today",
    });
  }

  const editing = task != null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >

      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <Pressable style={styles.background} onPress={onClose} />
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {editing ? "Edit Task" : "Add Task"}
            </Text>
            <Pressable style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>x</Text>
            </Pressable>
          </View>
          <Text style={styles.label}>TASK TITLE</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter task title..."
            placeholderTextColor="#aaa"
            value={title}
            onChangeText={setTitle}
          />
          <Text style={styles.label}>CATEGORY</Text>
          <View style={styles.categories}>
            <Pressable
              style={[
                styles.categoryButton,
                category === "School" && styles.categoryButtonSelected,
              ]}
              onPress={() => {
                setCategory("School");
              }}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  category === "School" && styles.categoryButtonTextSelected,
                ]}
              >
                School
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.categoryButton,
                category === "Personal" && styles.categoryButtonSelected,
              ]}
              onPress={() => {
                setCategory("Personal");
              }}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  category === "Personal" && styles.categoryButtonTextSelected,
                ]}
              >
                Personal
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.categoryButton,
                category === "Work" && styles.categoryButtonSelected,
              ]}
              onPress={() => {
                setCategory("Work");
              }}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  category === "Work" && styles.categoryButtonTextSelected,
                ]}
              >
                Work
              </Text>
            </Pressable>
          </View>
          <Text style={styles.label}>DUE DATE</Text>
          <TextInput
            style={styles.input}
            placeholder="Today, Friday, Oct 24..."
            placeholderTextColor="#aaa"
            value={dueDate}
            onChangeText={setDueDate}
          />
          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>
              {editing ? "Save Changes" : "Add Task"}
            </Text>
          </Pressable>
          <Pressable style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },

  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },

  modal: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 36,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222222",
  },

  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#f1f1f1",
    justifyContent: "center",
    alignItems: "center",
  },

  closeButtonText: {
    fontSize: 20,
    color: "#555555",
  },

  label: {
    fontSize: 10,
    fontWeight: "600",
    color: "#999999",
    marginBottom: 7,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 14,
    color: "#222222",
    marginBottom: 18,
  },

  categories: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },

  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },

  categoryButtonSelected: {
    backgroundColor: "#3478f6",
    borderColor: "#3478f6",
  },

  categoryButtonText: {
    fontSize: 12,
    color: "#444444",
  },

  categoryButtonTextSelected: {
    color: "#ffffff",
  },

  saveButton: {
    height: 48,
    backgroundColor: "#3478f6",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },

  saveButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 14,
  },

  cancelButton: {
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 6,
  },

  cancelButtonText: {
    color: "#777777",
    fontSize: 13,
  },
});
