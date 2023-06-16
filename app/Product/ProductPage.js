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
  FlatList,
} from "react-native";
import { Image } from "@rneui/themed";
import { usePathname, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Octicons from "react-native-vector-icons/Octicons";
import Icons from "../../components/ProductPage/Icon";
import RelatedProduct from "../../components/ProductPage/RelatedProduct";
import Comments from "../../components/ProductPage/Comments";
import { add_to_cart } from "../../actions";

const ProductPage = () => {
  const { width } = useWindowDimensions();
  const navigation = useRouter();
  const path = usePathname();
  const dispatch = useDispatch();
  const Products = useSelector((state) => state.Products);
  const Cart = useSelector((state) => state.Cart);
  const Display_Product = useSelector((state) => state.Display_Product);
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
  } = Display_Product;
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const related = Products.filter((itm) => itm.category === category);
    setRelatedProducts((prev) => [...related]);
  }, [Display_Product]);

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

  async function handleBuyNow() {
    const all_products = Cart;
    const item = Display_Product;
    let index = 0;
    const found_product = Cart.find((prod, indx) => {
      if (prod === item) {
        index = indx;
        return prod;
      }
    });

    if (found_product) {
      found_product.quantity = found_product.quantity + 1;
      all_products[index] = found_product;

      return dispatch(add_to_cart([...all_products]));
    } else {
      item.quantity = 1;
      all_products.push(item);

      dispatch(add_to_cart([...all_products]));
      return navigation.push("Product/BuyPage");
    }
  }
  function handleCart() {
    const all_products = Cart;
    const item = Display_Product;
    let index = 0;
    const found_product = Cart.find((prod, indx) => {
      if (prod === item) {
        index = indx;
        return prod;
      }
    });

    if (found_product) {
      found_product.quantity = found_product.quantity + 1;
      all_products[index] = found_product;

      return dispatch(add_to_cart([...all_products]));
    } else {
      item.quantity = 1;
      all_products.push(item);

      return dispatch(add_to_cart([...all_products]));
    }
  }

  if (path !== "/Product/ProductPage") {
    return <></>;
  }

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
          keyExtractor={(item) => item.toString()}
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
              onPress={handleBuyNow}
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
              onPress={handleCart}
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
          keyExtractor={(item) => item.title}
          renderItem={({ item }) =>
            item !== Display_Product && <RelatedProduct item={item} />
          }
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
