import { Pressable, StyleSheet, Text } from "react-native";

type FilterButtonProps = {
  title: string;
  active: boolean;
  onPress: () => void;
};

export default function FilterButton({
  title,
  active,
  onPress,
}: FilterButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, active && styles.buttonActive]}
    >
      <Text style={[styles.text, active && styles.textActive]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e7e7e7",
  },
  buttonActive: {
    backgroundColor: "#3478f6",
    borderColor: "#3478f6",
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555555",
  },
  textActive: {
    color: "#ffffff",
  },
});
