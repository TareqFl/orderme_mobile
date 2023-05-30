import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Alert,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { OrientationLock, lockAsync } from "expo-screen-orientation";
import { Input } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import { DOMAIN } from "@env";
import { useDispatch } from "react-redux";
import { get_store_products } from "../../actions";
import { get_all_products } from "../../actions";
import { useRouter } from "expo-router";

const EditPAge = () => {
  const navigation = useRouter();
  const dispatch = useDispatch();
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
      base64: true,
    });

    if (!result.canceled) {
      setEntries((prev) => ({ ...prev, thumbnail: result.assets[0] }));
    }
  }
  async function handleImages() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
      base64: true,
    });

    if (!result.canceled) {
      return setImages((prev) => [...result.assets]);
    }
    return Alert.alert("something went wrong");
  }

  async function handleSubmit() {
    let keys = Object.keys(entries);
    let empty_keys = [];
    let fact = false;
    keys.forEach((ky) => {
      if (entries[ky] === "") {
        empty_keys.push(ky);
        return (fact = true);
      }
    });

    if (fact) {
      return Alert.alert("Emprty Field", `${empty_keys}`);
    }
    if (images.length === 0) {
      return Alert.alert("add Images", ``);
    }

    const form = new FormData();
    form.append("title", title);
    form.append("brand", brand);
    form.append("price", price);
    form.append("category", category);
    form.append("description", description);
    form.append("thumbnail", {
      uri: thumbnail.uri,
      type: thumbnail.type,
      name: thumbnail.fileName,
    });
    images.forEach((img, index) => {
      form.append(`images${index}`, {
        uri: img.uri,
        type: img.type,
        name: img.fileName,
      });
    });

    try {
      const response = await fetch(DOMAIN + "/add_product", {
        method: "POST",
        body: form,
      });

      const data = await response.json();
      if (response.status === 200) {
        setEntries((prev) => ({
          title: "",
          brand: "",
          price: "",
          category: "",
          description: "",
          thumbnail: "",
        }));
        dispatch(get_all_products());
        dispatch(get_store_products());
        navigation.back();
      }
    } catch (error) {
      Alert.alert("something went wrong");
    }
  }
  // Submit end

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
                source={{ uri: thumbnail.uri }}
                style={{ width: 200, height: 200 }}
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
                    style={{ width: 150, height: 150 }}
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
