import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";

const Icon = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginTop: 16,
      }}
    >
      <View style={{ alignItems: "center", justifyContent: "center", gap: 2 }}>
        <MaterialCommunityIcons name="phone-return" color="black" size={30} />
        <Text style={{ fontSize: 10 }}>Return Garuntee</Text>
      </View>
      <View style={{ alignItems: "center", justifyContent: "center", gap: 2 }}>
        <FontAwesome5 name="shipping-fast" color="black" size={30} />
        <Text style={{ fontSize: 10 }}>Fast Shipping</Text>
      </View>
      <View style={{ alignItems: "center", justifyContent: "center", gap: 2 }}>
        <FontAwesome5 name="user-lock" color="black" size={30} />
        <Text style={{ fontSize: 10 }}>Safe Transaction</Text>
      </View>
      <View style={{ alignItems: "center", justifyContent: "center", gap: 2 }}>
        <Entypo name="shield" color="black" size={30} />
        <Text style={{ fontSize: 10 }}>2 Year Warantee</Text>
      </View>
    </View>
  );
};

export default Icon;

const styles = StyleSheet.create({});
