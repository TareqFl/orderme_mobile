import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import {
  Badge,
  // Avatar,
  // Icon,
  // withBadge
} from "@rneui/themed";
import { useSelector } from "react-redux";

const CartBadge = ({ cart, cc }) => {
  const Cart = useSelector((state) => state.Cart);

  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
      }}
    >
      <View style={{ position: "relative" }}>
        <Badge
          value={Cart.length > 0 ? Cart.length : 0}
          containerStyle={{
            position: "absolute",
            right: 4,
            top: -12,
            zIndex: 10,
          }}
          status="error"
        />
        <MaterialIcons
          name="shopping-cart"
          size={cart}
          color={cc}
          style={{ zIndex: 1, alignSelf: "center" }}
        />
      </View>
      <Text style={{ color: cc, fontSize: 10, textAlign: "center" }}>Cart</Text>
    </View>
  );
};

export default CartBadge;

const styles = StyleSheet.create({});
