import { Pressable, StyleSheet, Text, View, useColorScheme } from "react-native";

import { Colors } from "@/constants/theme";
import type { Note } from "@/services/noteServices";

type NoteCardProps = {
  note: Note;
  onToggleFavorite: (note: Note) => void;
  onEdit: (note: Note) => void;
  onDelete: (note: Note) => void;
};

function getPreview(content: string): string {
  const text = content.trim();
  if (text.length <= 100) {
    return text;
  }
  return text.slice(0, 100) + "...";
}

function getDateText(note: Note): string {
  const timestamp = note.updatedAt ?? note.createdAt;
  if (!timestamp) {
    return "Saving...";
  }
  return "Updated " + timestamp.toDate().toLocaleDateString();
}

export default function NoteCard({
  note,
  onToggleFavorite,
  onEdit,
  onDelete,
}: NoteCardProps) {
  const scheme = useColorScheme() === "dark" ? "dark" : "light";
  const theme = Colors[scheme];

  return (
    <View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>
      <View style={styles.headerRow}>
        <Text
          style={[styles.title, { color: theme.text }]}
          numberOfLines={1}
        >
          {note.title}
        </Text>
        <Pressable
          onPress={() => onToggleFavorite(note)}
          accessibilityLabel={
            note.isFavorite ? "Remove from favorites" : "Add to favorites"
          }
          hitSlop={8}
        >
          <Text style={[styles.star, note.isFavorite && styles.starActive]}>
            {note.isFavorite ? "★" : "☆"}
          </Text>
        </Pressable>
      </View>

      {note.content.trim() !== "" && (
        <Text style={[styles.preview, { color: theme.textSecondary }]}>
          {getPreview(note.content)}
        </Text>
      )}

      <View style={styles.footerRow}>
        <Text style={[styles.date, { color: theme.textSecondary }]}>
          {getDateText(note)}
        </Text>
        <View style={styles.actions}>
          <Pressable onPress={() => onEdit(note)} hitSlop={8}>
            <Text style={styles.editText}>Edit</Text>
          </Pressable>
          <Pressable onPress={() => onDelete(note)} hitSlop={8}>
            <Text style={styles.deleteText}>Delete</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    gap: 8,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: "bold",
  },
  star: {
    fontSize: 22,
    color: "#999999",
  },
  starActive: {
    color: "#f5a623",
  },
  preview: {
    fontSize: 14,
    lineHeight: 20,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  date: {
    fontSize: 12,
  },
  actions: {
    flexDirection: "row",
    gap: 16,
  },
  editText: {
    color: "#3478f6",
    fontWeight: "bold",
  },
  deleteText: {
    color: "#ff4d4f",
    fontWeight: "bold",
  },
});
