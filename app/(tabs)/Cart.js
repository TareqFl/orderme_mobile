import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import CartProducts from "../../components/Cart/CartProducts";
import { useRouter } from "expo-router";
import EmptyCart from "../../components/Cart/EmptyCart";
import { useFocusEffect } from "expo-router";
const CartPage = () => {
  const navigation = useRouter();
  const { Cart } = useSelector((state) => state);

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (Cart.length === 0) {
      return setTotalAmount(0);
    }
    let total_am = 0;
    Cart.forEach((itm) => {
      total_am = total_am + itm.price * itm.quantity;
    });
    setTotalAmount((prev) => total_am);
  }, [Cart]);

  if (!Cart.length) {
    return <EmptyCart />;
  }

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={{ width: "100%", height: 400 }}>
        <FlatList
          data={Cart}
          key={({ item, index }) => index}
          contentContainerStyle={{
            padding: 16,
          }}
          renderItem={({ item }) => <CartProducts item={item} />}
          ItemSeparatorComponent={
            <View style={{ width: "100%", height: 16 }}></View>
          }
        />
      </View>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "900" }}>Total</Text>
        <Text style={{ fontSize: 16, fontWeight: "900" }}>${totalAmount}</Text>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "tomato",
          alignItems: "center",
          justifyContent: "center",
          width: 300,
          height: 50,
          borderRadius: 8,
        }}
        onPress={() => {
          navigation.push("Product/BuyPage");
        }}
      >
        <Text style={{ color: "white", fontWeight: "900" }}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartPage;

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: "5%",
    gap: 16,
  },
});
