import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Image } from "@rneui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DOMAIN } from "../../Api";
import { useRouter } from "expo-router";
import { get_store_products, refresh_display_product } from "../../actions";
import * as ImagePicker from "expo-image-picker";
import Categories from "../../components/StorePage/Categories";

const EditProduct = () => {
  const navigation = useRouter();
  const dispatch = useDispatch();
  const Display_Store_Product = useSelector(
    (state) => state.Display_Store_Product
  );
  const [toDelete, setToDelete] = useState([]);
  const [entries, setEntries] = useState({
    id: "",
    title: "",
    brand: "",
    price: "",
    category: "",
    description: "",
    thumbnail: "",
    images: [],
    changed_thumbnail: false,
    changed_images: false,
  });

  const {
    id,
    title,
    brand,
    price,
    category,
    description,
    thumbnail,
    images,
    changed_thumbnail,
    changed_images,
  } = entries;

  useEffect(() => {
    setEntries((prev) => ({
      ...Display_Store_Product,
      changed_thumbnail: false,
      changed_images: false,
    }));
  }, []);

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
      return setEntries((prev) => ({
        ...prev,
        thumbnail: result.assets[0],
        changed_thumbnail: true,
      }));
    }
    return;
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
      return setEntries((prev) => ({
        ...prev,
        images: [...images, ...result.assets],
        changed_images: true,
      }));
    }
    return;
  }

  async function handleSubmit() {
    // handle errors
    let formKeys = Object.keys(entries);
    formKeys.map((key) => {
      if (entries[key] === "" || entries[key].length === 0) {
        return Alert.alert("Error!", `Your forgot to change ${key}`);
      }
    });

    const form = new FormData();
    form.append("id", id);
    form.append("title", title);
    form.append("brand", brand);
    form.append("price", price);
    form.append("category", category);
    form.append("description", description);
    form.append("changed_thumbnail", changed_thumbnail);
    form.append("changed_images", changed_images);
    if (typeof thumbnail !== "string") {
      form.append("thumbnail", {
        uri: thumbnail.uri,
        type: thumbnail.type,
        name: thumbnail.fileName,
      });
    }
    images.forEach((img, index) => {
      typeof img !== "string" &&
        form.append(`images${index}`, {
          uri: img.uri,
          type: img.type,
          name: img.fileName,
        });
    });
    try {
      const response = await fetch(DOMAIN + "/update_product", {
        method: "POST",
        body: form,
      });

      if (toDelete.length > 0) {
        toDelete.map((img) => {
          fetch(img, { method: "DELETE" })
            .then((resp) => resp)
            .catch((err) => err);
        });
      }
      const data = await response.json();
      if (response.status === 200) {
        navigation.back();
        dispatch(refresh_display_product());
        return dispatch(get_store_products());
      }
      return Alert.alert("something went wrong please try again");
    } catch (error) {
      Alert.alert("Something went wrong", error.message);
    }
  }

  function handleImageDelete(img, index) {
    const new_images = images.filter((img__) => img__ !== img && img__);

    if (typeof img !== "string") {
      return setEntries((prev) => ({
        ...prev,
        images: [...new_images],
      }));
    }
    setToDelete((prev) => [...prev, img]);
    return setEntries((prev) => ({
      ...prev,
      images: [...new_images],
    }));
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={{ textAlign: "center", fontSize: 16, marginVertical: 8 }}>
        Changes wont take effect until you submit
      </Text>
      <View style={styles.container}>
        <Input
          containerStyle={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={(e) => {
            return setEntries((prev) => ({ ...prev, title: e }));
          }}
        />
        <Input
          containerStyle={styles.input}
          placeholder="Brand"
          value={brand}
          onChangeText={(e) => {
            return setEntries((prev) => ({ ...prev, brand: e }));
          }}
        />
        <Input
          containerStyle={styles.input}
          placeholder="Price"
          value={price.toString()}
          onChangeText={(e) => {
            return setEntries((prev) => ({ ...prev, price: e }));
          }}
        />
        {/* <Input
          containerStyle={styles.input}
          placeholder="Category"
          value={category}
          onChangeText={(e) => {
            return setEntries((prev) => ({ ...prev, category: e }));
          }}
        /> */}

        <Input
          containerStyle={[styles.description, { zIndex: 1 }]}
          multiline={true}
          numberOfLines={4}
          maxLength={250}
          placeholder="Description"
          value={description}
          onChangeText={(e) => {
            return setEntries((prev) => ({ ...prev, description: e }));
          }}
        />
      </View>
      <View
        style={{
          zIndex: 10,
          height: 150,
          justifyContent: "flex-start",
        }}
      >
        <Categories
          intitial={category}
          width={250}
          height={125}
          onChange={(e) => setEntries((prev) => ({ ...prev, category: e }))}
        />
      </View>
      <Text style={{ textAlign: "center", zIndex: 1 }}>
        {" "}
        Click on an Image to delete
      </Text>

      <View
        style={{
          width: "100%",
          paddingHorizontal: 16,
          zIndex: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            marginVertical: 16,
            zIndex: 1,
          }}
        >
          <TouchableOpacity style={styles.upload} onPress={handleThumbnail}>
            <Text style={styles.uploadText}>Thumbnail</Text>
          </TouchableOpacity>
          {thumbnail && (
            <TouchableOpacity
              onPress={() => setEntries((prev) => ({ ...prev, thumbnail: "" }))}
            >
              <Image
                source={{
                  uri:
                    typeof thumbnail === "string" ? thumbnail : thumbnail.uri,
                }}
                containerStyle={{ height: 100, width: 100 }}
                PlaceholderContent={
                  <ActivityIndicator style={{ height: 100, width: 100 }} />
                }
              />
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            marginVertical: 16,
            flexWrap: "wrap",
          }}
        >
          <TouchableOpacity style={styles.upload} onPress={handleImages}>
            <Text style={styles.uploadText}>Images</Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            {images.length !== 0 &&
              images.map((img, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleImageDelete(img, index)}
                  >
                    <Image
                      source={{ uri: typeof img === "string" ? img : img.uri }}
                      PlaceholderContent={
                        <ActivityIndicator
                          style={{ height: 100, width: 100 }}
                        />
                      }
                      containerStyle={{ height: 100, width: 100 }}
                    />
                  </TouchableOpacity>
                );
              })}
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={{
          width: "90%",
          height: 60,
          backgroundColor: "tomato",
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 50,
          borderRadius: 12,
          alignSelf: "center",
        }}
        onPress={handleSubmit}
      >
        <Text style={{ color: "white", fontWeight: "900", fontSize: 14 }}>
          Submit
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upload: {
    // width: "25%",
    paddingVertical: 12,
    paddingHorizontal: 4,
    backgroundColor: "tomato",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    zIndex: 1,
  },
  uploadText: { color: "white", fontWeight: "900" },
  input: {
    zIndex: 1,
  },
  description: {
    height: 120,
    borderColor: "gray",
    fontSize: 16,
    padding: 10,
    zIndex: 1,
  },
});
