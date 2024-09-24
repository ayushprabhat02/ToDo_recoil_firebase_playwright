import { collection, addDoc, onSnapshot, updateDoc, doc, deleteDoc } from "firebase/firestore";
import firestore from "../../firebaseConfig"; // Ensure this path is correct
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import ListView from "../components/ListView";
import { ListAtom } from "../recoil/atoms";
import { taskCompletedSelector, taskPendingSelector } from "../recoil/selectors";

const Home :React.FC= () => {
  const [task, setTask] = useState<string>("");
  const [list, setList] = useRecoilState(ListAtom);
  const completedTasks = useRecoilValue(taskCompletedSelector);
  const pendingTasks = useRecoilValue(taskPendingSelector);

  // ADD TASK
  const handlePlusButton = async () => {
    if (task.trim()) {
      try {
        await addDoc(collection(firestore, "taskList"), {
          text: task,
          completed: false,
        });
        console.log("task added!");
        setTask(""); // Clear input after adding
      } catch (error) {
        console.error("Error adding task: ", error);
      }
    }
  };

  // GET ALL TASKS
  useEffect(() => {
    const subscriber = onSnapshot(collection(firestore, "taskList"), (querySnapshot) => {
      const tasks = [];
      querySnapshot.forEach((documentSnapshot) => {
        tasks.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
      console.log("tasks", tasks);
      setList(tasks);
    });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  // UPDATE TASK
  const toggleSelection = async (key: any) => {
    const updatedTask = list.find((item) => item.key === key);
    await updateDoc(doc(firestore, "taskList", key), {
      completed: !updatedTask?.completed,
    }).then(() => {
      console.log("User updated!");
    });
  };

  // DELETE TASK
  const handleDelete = async (key: any) => {
    await deleteDoc(doc(firestore, "taskList", key)).then(() => {
      console.log("Task deleted!");
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To do app</Text>
      <Text style={styles.subTitle}>Pending Tasks</Text>
      <FlatList
        data={pendingTasks}
        renderItem={({ item }) => (
          <ListView
            item={item}
            onToggle={() => toggleSelection(item?.key)}
            onDelete={() => handleDelete(item?.key)}
          />
        )}
      />
      <Text>Completed tasks</Text>
      <FlatList
        data={completedTasks}
        renderItem={({ item }) => (
          <ListView
            item={item}
            onToggle={() => toggleSelection(item?.key)}
            onDelete={() => handleDelete(item?.key)}
          />
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter tasks...."
          value={task}
          onChangeText={(txt) => setTask(txt)}
        />
        <Pressable style={styles.plusButton} onPress={handlePlusButton}>
          <Text style={{ fontSize: 30 }}>+</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    padding:10
  },
  plusButton: {
    backgroundColor: "grey",
    marginLeft: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "black",
    textAlign: "center",
  },
  subTitle: {},
});
