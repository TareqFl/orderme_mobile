import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { Image } from "@rneui/themed";
import { useSearchParams, useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import Octicons from "react-native-vector-icons/Octicons";
import Icons from "../../components/ProductPage/Icon";
import RelatedProduct from "../../components/ProductPage/RelatedProduct";
import Comments from "../../components/ProductPage/Comments";

const ProductPage = () => {
  const { width } = useWindowDimensions();
  const { productIndex } = useSearchParams();
  const navigation = useRouter();
  const { Products } = useSelector((state) => state);
  const [displayProduct, setProduct] = useState({
    id: "",
    title: "",
    price: "",
    brand: "",
    category: "",
    description: "",
    rating: "",
    thumbnail: "",
    images: [],
  });

  const {
    id,
    title,
    price,
    brand,
    category,
    description,
    rating,
    thumbnail,
    images,
  } = displayProduct;

  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    setProduct((prev) => Products[productIndex]);
    const related = Products.filter((itm) => {
      if (itm.category === category) {
        return itm;
      }
      return;
    });
    setRelatedProducts((prev) => [...related]);
  }, [displayProduct]);

  const lists = [
    "Sed sed nunc tincidunt, dapibus erat ac, dapibus lacus.",
    "Praesent et tortor feugiat, feugiat lacus ut, euismod augue.",
    "Quisque molestie augue eget justo consequat rhoncus.",
    "Pellentesque tempus enim ut enim dictum lobortis.",
    "Curabitur vel lorem interdum, pulvinar lectus imperdiet, ornare ipsum.",
    "Nunc ut ipsum a dui tincidunt tincidunt.",
    "Quisque vulputate lectus quis eros aliquet, vitae condimentum orci fermentum.",
    "Curabitur condimentum odio eget nulla feugiat, quis tempor justo hendrerit.",
  ];

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: StatusBar.currentHeight,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16 }}
      >
        <FlatList
          keyExtractor={({ item, index }) => index}
          data={images.length > 0 ? [...images] : []}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              containerStyle={{
                width,
                height: 400,
                resizeMode: "stretch",
                borderRadius: 8,
                marginRight: 2,
                marginLeft: 2,
              }}
              loadingIndicatorSource={
                <ActivityIndicator style={{ height: "100%" }} />
              }
            />
          )}
          horizontal
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              letterSpacing: 1,
              fontSize: 40,
              fontWeight: "900",
              color: "tomato",
            }}
          >
            ${price}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#ed174a",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
                paddingVertical: 10,
                paddingHorizontal: 16,
                elevation: 4,
                shadowColor: "black",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
              }}
              onPress={() => navigation.push("Product/BuyPage")}
            >
              <Text style={{ color: "white", fontWeight: "700" }}>Buy Now</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#fb6a01",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
                paddingVertical: 10,
                paddingHorizontal: 16,
                elevation: 4,
                shadowColor: "black",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
              }}
            >
              <Text style={{ color: "white", fontWeight: "700" }}>
                Add To Cart
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={{ fontSize: 24, marginTop: 4, marginBottom: 4 }}>
          {title}
        </Text>

        <Text style={styles.description}>{description}</Text>

        {lists.map((li, index) => {
          return (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
                marginTop: 4,
              }}
            >
              <Octicons name="dot-fill" color="black" size={16} />
              <Text style={{ fontSize: 10 }}>{li}</Text>
            </View>
          );
        })}
        <Icons />
        <Text style={{ fontWeight: "900", marginVertical: 16, fontSize: 24 }}>
          Related Products
        </Text>
        <FlatList
          data={relatedProducts}
          keyExtractor={({ item, index }) => index}
          renderItem={({ item }) => <RelatedProduct item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: "900", marginTop: 24, fontSize: 24 }}>
            Users Comments
          </Text>
          <Comments />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductPage;

const styles = StyleSheet.create({
  description: {
    fontWeight: "bold",
  },
});
