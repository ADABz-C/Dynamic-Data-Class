import { useEffect, useState } from "react";
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

import type { Note } from "@/services/noteServices";

type NoteModalProps = {
  visible: boolean;
  note: Note | null;
  saving: boolean;
  onClose: () => void;
  onSave: (title: string, content: string) => void;
};

export default function NoteModal({
  visible,
  note,
  saving,
  onClose,
  onSave,
}: NoteModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  // Reset the form each time the modal opens or a different note is chosen.
  useEffect(() => {
    if (visible) {
      setTitle(note ? note.title : "");
      setContent(note ? note.content : "");
      setError("");
    }
  }, [visible, note]);

  function handleSave() {
    if (saving) {
      return;
    }
    if (title.trim() === "") {
      setError("Title is required.");
      return;
    }
    onSave(title.trim(), content.trim());
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={styles.panel}>
          <View style={styles.headerRow}>
            <Text style={styles.heading}>
              {note ? "Edit Note" : "New Note"}
            </Text>
            <Pressable onPress={onClose} hitSlop={8}>
              <Text style={styles.closeText}>✕</Text>
            </Pressable>
          </View>

          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Note title"
            placeholderTextColor="#999999"
            value={title}
            onChangeText={setTitle}
            maxLength={200}
          />

          <Text style={styles.label}>Content</Text>
          <TextInput
            style={[styles.input, styles.contentInput]}
            placeholder="Write your note..."
            placeholderTextColor="#999999"
            value={content}
            onChangeText={setContent}
            multiline
            textAlignVertical="top"
          />

          {error !== "" && <Text style={styles.errorText}>{error}</Text>}

          <Pressable
            style={[styles.saveButton, saving && styles.disabled]}
            onPress={handleSave}
            disabled={saving}
          >
            <Text style={styles.saveText}>
              {saving ? "Saving..." : note ? "Save Changes" : "Add Note"}
            </Text>
          </Pressable>
          <Pressable onPress={onClose} disabled={saving}>
            <Text style={styles.cancelText}>Cancel</Text>
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
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  panel: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#171717",
  },
  closeText: {
    fontSize: 20,
    color: "#8a8a8a",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555555",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e7e7e7",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: "#171717",
    backgroundColor: "#f7f7f8",
    marginBottom: 14,
  },
  contentInput: {
    height: 140,
  },
  errorText: {
    color: "#ff4d4f",
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "#3478f6",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  disabled: {
    opacity: 0.6,
  },
  saveText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelText: {
    textAlign: "center",
    color: "#8a8a8a",
    marginTop: 14,
    fontSize: 15,
  },
});
