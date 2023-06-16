import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { Image } from "@rneui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";

const DisplayProduct = () => {
  const navigation = useRouter();
  const Display_Store_Product = useSelector(
    (state) => state
  ).Display_Store_Product;
  const {
    // product_id,
    id,
    title,
    brand,
    price,
    category,
    description,
    thumbnail,
    images,
  } = Display_Store_Product;
  const RepeatedRow = ({ text1, text2, thumbnail, images }) => {
    return (
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Text>{text1}</Text>
        <Text style={{ textAlign: "right", flex: 1 }}>{text2}</Text>
        {thumbnail && (
          <Image
            source={{ uri: thumbnail }}
            PlaceholderContent={<ActivityIndicator />}
            containerStyle={{ width: 100, height: 100 }}
          />
        )}
        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
            gap: 8,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {images &&
            images.map((image, indx) => {
              return (
                <Image
                  key={indx}
                  source={{ uri: image }}
                  PlaceholderContent={<ActivityIndicator />}
                  containerStyle={{
                    width: 100,
                    height: 100,
                  }}
                />
              );
            })}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <RepeatedRow text1={"Product ID"} text2={id} />
      <RepeatedRow text1={"Title"} text2={title} />
      <RepeatedRow text1={"Brand"} text2={brand} />
      <RepeatedRow text1={"Price"} text2={price} />
      <RepeatedRow text1={"Category"} text2={category} />
      <RepeatedRow text1={"Description"} text2={description} />
      <RepeatedRow text1={"Thumbnail"} thumbnail={thumbnail} />
      <RepeatedRow text1={"Images"} images={images} />
      <TouchableOpacity
        style={{
          width: "100%",
          backgroundColor: "tomato",
          height: 50,
          marginBottom: 25,
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => navigation.push(`Edit/EditProduct`)}
      >
        <Text style={{ fontWeight: "900", color: "white" }}>Edit Item</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DisplayProduct;

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
});
