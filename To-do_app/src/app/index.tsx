import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import { View } from "react-native-reanimated/lib/typescript/Animated";

export default function HomeScreen() {
  const [item, setItem] = useState("");
  const [groceries, setGroceries] = useState<string[]>([]);

  function addItem() {
    if (item.trim() === "") {
      return;
    }
    setGroceries([...groceries, item.trim()]);
    setItem("");
  }

  function deleteItem(index: number){
    const newGroceries = groceries.filter(
      (item, itemIndex) => itemIndex !== index,
    )
    setGroceries(newGroceries);
  }
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.title}>To-do List</Text>
        <TextInput
          style={styles.input}
          placeholder="Add Item..."
          value={item}
          onChangeText={setItem}
        />

        <Pressable onPress={addItem}>
          <Text style={styles.buttonText}>Add Item</Text>
        </Pressable>
        <FlatList
          data={groceries}
          keyExtractor={(item, index) => item.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.todoItem}>
              <Text style={styles.todoText}>{item}</Text>
              <Pressable onPress={()=> deleteItem(index)}>
                <Text style={styles.deleteText}>Delete</Text>
              </Pressable>
            </View>
          )}
          // renderItem={({ item }) => <Text>{item}</Text>}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: "center",
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    color: "#333333",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
  },
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#cdcdcd",
    marginTop: 10,
    borderRadius: 5,
    width: "100%",
  },
  todoText: {
    fontSize: 16,
    // color: "#333333",
  },
  deleteText: {
    color: "red",
    fontWeight: "bold",
    marginLeft: 10,
  },
});