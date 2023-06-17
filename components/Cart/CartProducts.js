import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "@rneui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { add_to_cart } from "../../actions";
import Ionicons from "react-native-vector-icons/Ionicons";
const CartProducts = ({ item }) => {
  const dispatch = useDispatch();
  const Cart = useSelector((state) => state.Cart);

  function handleAdd() {
    const all_products = Cart;

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

  function handleRemove() {
    let all_products = [];

    if (item.quantity === 1) {
      all_products = Cart.filter((prod) => prod !== item);
      console.log(all_products.length);
      return dispatch(add_to_cart([...all_products]));
    }
    all_products = Cart.filter((prod) =>
      prod === item ? (item.quantity = item.quantity - 1) : prod
    );

    return dispatch(add_to_cart([...all_products]));
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          height: 100,
          width: 100,
          backgroundColor: "white",
          borderRadius: 12,
          overflow: "hidden",
          shadowColor: "black",
          shadowOffset: { width: 4, height: 4 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 4,
        }}
      >
        <Image
          source={{ uri: item.thumbnail }}
          containerStyle={{
            height: "100%",
            width: "100%",
          }}
          PlaceholderContent={
            <ActivityIndicator style={{ height: 100, width: 100 }} />
          }
        />
      </View>

      <View style={{ width: 100 }}>
        <Text style={{ textAlign: "center" }}>{item.title}</Text>
      </View>

      <View
        style={{
          width: 80,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderWidth: 1,
          borderRadius: 4,
          borderColor: "#f5f5f7",
        }}
      >
        <TouchableOpacity style={styles.button} onPress={handleRemove}>
          <Ionicons name="remove" size={16} />
        </TouchableOpacity>
        <Text>{item.quantity}</Text>
        <TouchableOpacity style={styles.button} onPress={handleAdd}>
          <Ionicons name="add" size={16} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartProducts;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderColor: "#f5f5f7",
  },
  button: {
    backgroundColor: "#DDE6ED",
    height: 24,
    width: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});
