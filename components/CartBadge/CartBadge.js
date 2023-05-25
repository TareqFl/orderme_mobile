import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { Avatar, Badge, Icon, withBadge } from "@rneui/themed";
import { useSelector } from "react-redux";

const CartBadge = ({ cart }) => {
  const { Cart } = useSelector((state) => state);

  return (
    <View>
      <Badge
        value={Cart.length > 0 ? Cart.length : 0}
        containerStyle={{
          position: "absolute",
          right: -10,
          top: -10,
          zIndex: 10,
        }}
        status="error"
      />
      <MaterialIcons
        name="shopping-cart"
        size={cart}
        color="black"
        style={{ zIndex: 1 }}
      />
    </View>
  );
};

export default CartBadge;

const styles = StyleSheet.create({});
