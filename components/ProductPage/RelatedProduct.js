import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Image } from "@rneui/themed";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";

const RelatedProduct = ({ item }) => {
  const navigation = useRouter();
  const { Products } = useSelector((state) => state);

  // handler
  function handlePress() {
    const indexOfProduct = Products.indexOf(item);
    return navigation.push("Product/" + indexOfProduct);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <Image
          source={{ uri: item.thumbnail }}
          alt={item.title}
          containerStyle={styles.thumbnail}
          loadingIndicatorSource={
            <ActivityIndicator style={{ height: "100%" }} />
          }
        />
      </TouchableOpacity>
    </View>
  );
};

export default RelatedProduct;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginHorizontal: 8,
  },
  thumbnail: {
    width: 96,
    height: 96,
    resizeMode: "stretch",
    borderRadius: 8,
  },
});
