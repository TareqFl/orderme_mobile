import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "@rneui/themed";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { display_product, get_store_products } from "../../actions";
import { DOMAIN } from "@env";
const TableRows = ({ value }) => {
  const navigation = useRouter();
  const dispatch = useDispatch();

  async function handleDelete() {
    const response = await fetch(DOMAIN + "/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: value.id }),
    });
    if (response.status === 200) {
      Alert.alert("Deleted");
      dispatch(get_store_products());
    } else {
      Alert.alert("something went wrong");
    }
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: 24,
        }}
      >
        {/* Change to Product Id */}
        <Text>{value.id}</Text>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: 80,
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
        <Text>{value.price}</Text>
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

      <View style={styles.action}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => dispatch(display_product(value))}
        >
          <MaterialCommunityIcons name="eye" color={"tomato"} size={25} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleDelete}>
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
    width: 70,
  },
  actionButton: {
    paddingVertical: 14,
    paddingHorizontal: 2,
  },
});
