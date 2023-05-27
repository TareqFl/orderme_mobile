import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Input } from "@rneui/themed";

const EditProduct = () => {
  const { Display_Product } = useSelector((state) => state);
  const [images, setImages] = useState([]);
  const [entries, setEntries] = useState({
    title: "",
    brand: "",
    price: "",
    category: "",
    description: "",
    thumbnail: "",
  });

  const [entryError, setError] = useState({
    title_error: "",
    brand_error: "",
    price_error: "",
    category_error: "",
    description_error: "",
  });

  const { title, brand, price, category, description, thumbnail } = entries;
  const {
    title_error,
    brand_error,
    price_error,
    category_error,
    description_error,
  } = entryError;

  useEffect(() => {
    setEntries((prev) => Display_Product);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <Input
          containerStyle={styles.input}
          placeholder="Title"
          errorStyle={{ color: "red" }}
          errorMessage={title_error}
          value={title}
          onChangeText={(e) => setEntries((prev) => ({ ...prev, title: e }))}
        />
        <Input
          containerStyle={styles.input}
          placeholder="Brand"
          errorStyle={{ color: "red" }}
          errorMessage={brand_error}
          value={brand}
          onChangeText={(e) => setEntries((prev) => ({ ...prev, brand: e }))}
        />
        <Input
          containerStyle={styles.input}
          placeholder="Price"
          inputMode="numeric"
          errorStyle={{ color: "red" }}
          errorMessage={price_error}
          value={price}
          onChangeText={(e) => setEntries((prev) => ({ ...prev, price: e }))}
        />
        <Input
          containerStyle={styles.input}
          placeholder="Category"
          errorStyle={{ color: "red" }}
          errorMessage={category_error}
          value={category}
          onChangeText={(e) => setEntries((prev) => ({ ...prev, category: e }))}
        />
        <Input
          containerStyle={styles.description}
          multiline={true}
          numberOfLines={4}
          maxLength={250}
          placeholder="Description"
          errorStyle={{ color: "red" }}
          errorMessage={description_error}
          value={description}
          onChangeText={(e) =>
            setEntries((prev) => ({ ...prev, description: e }))
          }
        />
      </View>
    </ScrollView>
  );
};

export default EditProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
