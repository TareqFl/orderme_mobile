import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Image } from "@rneui/themed";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";

const CartItems = ({ item, index }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
        elevation: 8,
        gap: 4,
        backgroundColor: "#FAF7F0",
      }}
    >
      <View
        style={{
          elevation: 4,
          shadowColor: "black",
          shadowOffset: { height: 4, width: 4 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
        }}
      >
        <Image
          style={{
            width: 100,
            height: 100,
            borderRadius: 12,
          }}
          source={{ uri: item.thumbnail }}
          PlaceholderContent={<ActivityIndicator />}
        />
      </View>
      <Text>{item.title.substring(0, 10)}</Text>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="ios-remove" />
        </TouchableOpacity>
        <Text>{item.quantity}</Text>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="add" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItems;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ECECEC",
    height: 24,
    width: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
});
