import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Image } from "@rneui/themed";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { add_to_cart } from "../../actions";
const ProductCard = ({ item, index }) => {
  const navigation = useRouter();

  const { id, title, price, brand, category, description, rating, thumbnail } =
    item;

  const dispatch = useDispatch();
  const { Cart } = useSelector((state) => state);

  // handler
  function handleCart() {
    const all_products = Cart;
    const found_product = Cart.find((prod) => prod === item);

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
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.thumbnailContainer}
        onPress={() => navigation.push(`/Product/${index}`)}
      >
        <Image
          source={{ uri: thumbnail }}
          containerStyle={styles.thumbnail}
          PlaceholderContent={<ActivityIndicator style={{ height: "100%" }} />}
        />
      </TouchableOpacity>
      <Text style={styles.price}>${price}</Text>
      <Text style={styles.title}>{title.substring(0, 10)}</Text>
      <View style={styles.soldAmount}>
        <Text>Sold</Text>
        <View style={styles.horizontalDivider} />
        <Text>{Math.floor(Math.random() * 10)}</Text>
      </View>
      <View style={styles.lastRow}>
        <View style={styles.stars}>
          <MaterialIcons name="stars" size={30} color="gold" />
          <Text style={styles.rating}>
            {(Math.random() * 10).toString().substring(0, 3)} ratings
          </Text>
        </View>

        <TouchableOpacity onPress={handleCart}>
          <MaterialIcons name="add-shopping-cart" size={30} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    width: "47%",
    padding: 4,
    flexDirection: "column",
    gap: 6,
    borderColor: "lightgray",
    marginLeft: "1.25%",
    marginRight: "1.25%",
    borderRadius: 4,
    elevation: 8,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    backgroundColor: "white",
  },
  thumbnailContainer: {
    backgroundColor: "white",
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    borderRadius: 8,
  },
  thumbnail: {
    height: 150,
    width: "100%",
    borderRadius: 8,
    resizeMode: "stretch",
  },
  price: {
    fontWeight: "bold",
    letterSpacing: 1,
  },
  title: {
    textAlign: "center",
  },
  lastRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  soldAmount: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  stars: { flexDirection: "row", alignItems: "center" },
  rating: { fontSize: 10 },

  horizontalDivider: { width: 2, height: 16, backgroundColor: "grey" },
});
