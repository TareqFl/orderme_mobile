import { ActivityIndicator, View } from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { usePathname } from "expo-router";
import { FlashList } from "@shopify/flash-list";

const ProductsCard = () => {
  const path = usePathname();

  const SearchedProduct = useSelector((state) => state.SearchedProduct);
  const [renderImage, setRenderImage] = useState(12);

  const renderItemsFunc = ({ item, index }) => (
    <ProductCard item={item} index={index} />
  );

  const renderSeperator = () => {
    return <View style={{ width: "100%", height: 20 }}></View>;
  };

  const ListFooterComponent = () => {
    if (renderImage === SearchedProduct.length) {
      return <></>;
    } else {
      return <ActivityIndicator style={{ width: "100%", height: 100 }} />;
    }
  };
  return (
    <FlashList
      data={[...SearchedProduct.slice(0, renderImage)]}
      renderItem={renderItemsFunc}
      keyExtractor={(item, index) => index}
      estimatedItemSize={100}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={renderSeperator}
      ListFooterComponent={ListFooterComponent}
      onEndReachedThreshold={0}
      onEndReached={() => {
        if (renderImage + 10 > SearchedProduct.length) {
          return setRenderImage((value) => SearchedProduct.length);
        }
        return setRenderImage((prev) => prev + 6);
      }}
    />
  );
};

export default ProductsCard;
