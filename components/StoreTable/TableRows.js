import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "@rneui/themed";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const TableRows = ({ value }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: 24,
        }}
      >
        <Text>{value.id}</Text>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: 90,
        }}
      >
        <Text>{value.title}</Text>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: 75,
        }}
      >
        <Text>{value.brand}</Text>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: 75,
        }}
      >
        <Text>{value.price}</Text>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: 95,
        }}
      >
        <Text>{value.category}</Text>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: 120,
        }}
      >
        <Text style={{ fontSize: 10 }}>
          {value.description.substring(0, 50)}...
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: 120,
          height: 70,
        }}
      >
        <Image
          containerStyle={{ width: "100%", height: "100%" }}
          source={{ uri: value.thumbnail }}
          PlaceholderContent={<ActivityIndicator style={{ flex: 1 }} />}
        />
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: 80,
        }}
      >
        <Text>{value.images.length}</Text>
      </View>
      <View style={styles.action}>
        <TouchableOpacity style={styles.actionButton}>
          <MaterialCommunityIcons name="eye" color={"tomato"} size={25} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MaterialCommunityIcons name="delete" color="grey" size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TableRows;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    width: 120,
  },
  actionButton: {
    paddingVertical: 14,
    paddingHorizontal: 8,
  },
});
