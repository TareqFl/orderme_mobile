import { StyleSheet, View } from "react-native";
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
  const { Cart } = useSelector((state) => state);

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
            right: 5,
            top: -10,
            zIndex: 10,
          }}
          status="error"
        />
        <MaterialIcons
          name="shopping-cart"
          size={cart}
          color={cc}
          style={{ zIndex: 1 }}
        />
      </View>
    </View>
  );
};

export default CartBadge;

const styles = StyleSheet.create({});
