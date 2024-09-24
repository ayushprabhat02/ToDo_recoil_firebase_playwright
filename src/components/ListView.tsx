import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomRadioButton from "./CusotmRadioButton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ListView = (props: any) => {
  const { item, onToggle, onDelete } = props;

  // console.log('-----item----',item)

  return (
    <View key={item.key} style={styles.listViewConatiner}>
      <View
        style={{
          flex: 1,
          alignItems: "stretch",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
          <CustomRadioButton     testID="toggle_test" // Add testID for easier targeting in tests
 onPress={onToggle} selected={item.completed} />
          <Text style={{ paddingLeft: 8 }}>{item?.text}</Text>
        </View>
        <Text style={styles.status}>
          {item?.completed ? "Completed" : "Pending"}{" "}
        </Text>
      </View>
      <Text
        onPress={onDelete}
        style={{
          fontSize: 18,
          fontWeight: "bold",
          backgroundColor: "grey",
          width: 30,
          height: 30,
          borderRadius: 5,
          color: "ghostwhite",
          textAlign: "center",
          textAlignVertical: "center",
        }}
      >
        x
      </Text>
      {/* <Icon name="delete" size={30} color="#900" onPress={onDelete} /> */}
    </View>
  );
};

export default ListView;

const styles = StyleSheet.create({
  listViewConatiner: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    borderWidth: 0.5,
    padding: 10,
    marginTop: 15,
    borderRadius: 5,
  },
  status: {
    flex: 1,
    alignSelf: "flex-end",

    fontWeight: "bold",
    // backgroundColor:'green'
  },
});
