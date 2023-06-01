import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { FlatList } from "react-native-gesture-handler";

const Categories = ({ width, onChange, intitial, height }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [catV, setCatV] = useState("");

  const RenderCategory = ({ item, giveToPapi }) => {
    return (
      <TouchableOpacity
        style={{ width: "100%", marginVertical: 4 }}
        onPress={() => {
          setCatV(item);
          return giveToPapi(item);
        }}
      >
        <Text style={{ color: "black" }}>{item}</Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    const getter = async () => {
      if (open) {
        const response = await fetch(
          "https://dummyjson.com/products/categories"
        );
        const values = await response.json();
        return setData(values);
      }
      return setData([]);
    };
    getter();
    intitial && setCatV(intitial);
  }, [open]);

  return (
    <View style={[styles.inputContainer, { width, height: 50 }]}>
      <TextInput
        style={styles.input}
        placeholder="Category"
        placeholderTextColor="black"
        value={catV}
        onChange={() => setCatV(catV)}
      />
      <TouchableOpacity
        style={styles.arrowButton}
        onPress={() => setOpen((prev) => !open)}
      >
        <Ionicons
          name="caret-forward"
          style={{ transform: [{ rotate: open ? "90deg" : "0deg" }] }}
          size={16}
        />
      </TouchableOpacity>
      <View
        style={{
          display: open ? "flex" : "none",
          position: "absolute",
          height: height ? height : 300,
          width,
          top: 50,
          borderRadius: 12,
          paddingVertical: 4,
          paddingHorizontal: 8,
          backgroundColor: "white",
          elevation: 4,
          shadowColor: "black",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.25,
          shadowRadius: 2,
        }}
      >
        {!data.length ? (
          <ActivityIndicator style={{ height: height ? height : 300, width }} />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({ item }) => item}
            renderItem={({ item }) => (
              <RenderCategory item={item} giveToPapi={(v) => onChange(v)} />
            )}
          />
        )}
      </View>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    padding: 8,

    borderRadius: 12,
    position: "relative",
    backgroundColor: "white",
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
  },
  input: {
    flexGrow: 1,
    height: "100%",
  },
  arrowButton: {
    width: 25,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    padding: 4,
  },
});
