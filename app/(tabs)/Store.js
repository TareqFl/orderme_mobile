import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

const list = () => {
  return (
    <View style={styles.container}>
      <Text>Store</Text>
    </View>
  );
};

export default list;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
