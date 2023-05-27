import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { OrientationLock, lockAsync } from "expo-screen-orientation";
import { Image, Input } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";

const EditPAge = () => {
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

  // handlers
  async function handleThumbnail() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: false,
    });

    if (!result.canceled) {
      setEntries((prev) => ({ ...prev, thumbnail: result.assets[0].uri }));
    }
  }
  async function handleImages() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      setImages((prev) => [...result.assets]);
    }
  }

  async function handleSubmit() {
    let keys = Object.keys(entries);
    let empty_keys = [];
    let fact = false;
    keys.forEach((ky) => {
      if (entries[ky] === "") {
        empty_keys.push(ky);
        fact = true;
      }
    });

    if (fact) {
      return Alert.alert("Emprty Field", `${empty_keys}`);
    }
    if (images.length === 0) {
      return Alert.alert("add Images", ``);
    }

    return console.log("continue");
  }

  function handleThumbnailDelete() {
    return setEntries((prev) => ({ ...prev, thumbnail: "" }));
  }
  function handleImagesdelete(index) {
    const all_images = images.filter((img) => img !== images[index]);
    setImages([...all_images]);
  }
  return (
    <ScrollView style={{ flex: 1 }}>
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

        <TouchableOpacity style={styles.button} onPress={handleThumbnail}>
          <Text style={{ color: "white", fontWeight: "900" }}>Thumbnail</Text>
        </TouchableOpacity>

        {thumbnail !== "" && (
          <View
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 20,
              borderBottomWidth: 2,
            }}
          >
            <Pressable onPress={handleThumbnailDelete}>
              <Image
                source={{ uri: thumbnail }}
                containerStyle={{ width: 200, height: 200 }}
              />
            </Pressable>
          </View>
        )}
        <TouchableOpacity style={styles.button} onPress={handleImages}>
          <Text style={{ color: "white", fontWeight: "900" }}>Images</Text>
        </TouchableOpacity>
        {images.length !== 0 && (
          <View
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 20,
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 4,
            }}
          >
            {images?.map((img, index) => {
              return (
                <Pressable
                  key={index}
                  onPress={() => handleImagesdelete(index)}
                >
                  <Image
                    source={{ uri: img.uri }}
                    containerStyle={{ width: 150, height: 150 }}
                  />
                </Pressable>
              );
            })}
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={{ color: "white", fontWeight: "900" }}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditPAge;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "white",
    paddingVertical: 20,
  },
  input: {
    width: "50%",
    marginBottom: 12,
  },
  description: {
    textInput: {
      height: 120,
      borderColor: "gray",
      borderWidth: 1,
      fontSize: 16,
      padding: 10,
    },
  },
  button: {
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 4,
    backgroundColor: "tomato",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
});
