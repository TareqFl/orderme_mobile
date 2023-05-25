import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

const ProductsCard = () => {
  const { SearchedProduct } = useSelector((state) => state);
  const [renderImage, setRenderImage] = useState(24);

  return (
    <FlatList
      keyExtractor={(item) => item.name + `${Math.random()}`}
      data={[...SearchedProduct.slice(0, renderImage)]}
      ItemSeparatorComponent={() => (
        <View style={{ width: "100%", height: 20 }}></View>
      )}
      renderItem={({ item, index }) => (
        <ProductCard item={item} index={index} />
      )}
      initialNumToRender={15}
      numColumns={2}
      onEndReachedThreshold={0}
      onEndReached={() => {
        if (renderImage + 10 > SearchedProduct.length) {
          return setRenderImage((value) => SearchedProduct.length);
        }
        return setRenderImage((prev) => prev + 6);
      }}
      ListFooterComponent={() => {
        if (renderImage === SearchedProduct.length) {
          return <></>;
        } else {
          return <ActivityIndicator style={{ width: "100%", height: 100 }} />;
        }
      }}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ProductsCard;
