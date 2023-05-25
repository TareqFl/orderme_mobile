import { Image } from "@rneui/themed";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  View,
  StyleSheet,
  PanResponder,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";
import CartItems from "../../components/CartItems";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, useRootNavigation } from "expo-router";

const Store = ({ data }) => {
  alert(data);
  const { Cart } = useSelector((state) => state);
  const { height } = Dimensions;
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
      onPanResponderRelease: () => {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;

  const RepeatedField = ({ text, number }) => {
    return (
      <View style={{ width: "100%" }}>
        <Text>{text}</Text>
        <Text>{number}</Text>
      </View>
    );
  };

  if (!Cart.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Your Cart is Empty!</Text>
        <Animated.View
          style={{
            transform: [{ translateX: pan.x }, { translateY: pan.y }],
          }}
          {...panResponder.panHandlers}
        >
          <Image
            source={require("../../assets/logo.webp")}
            style={styles.box}
          />
        </Animated.View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "#FAF7F0",
          width: "100%",
          height: "30%",
          padding: 8,
          borderRadius: 12,
        }}
      >
        <FlatList
          style={{ backgroundColor: "white" }}
          data={Cart}
          keyExtractor={({ index }) => index}
          renderItem={({ item, index }) => (
            <CartItems item={item} index={index} />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 10 }}></View>}
        />
      </View>
      <RepeatedField text={"Subtotal"} />
      <RepeatedField text={" Shipping Cost"} />
      <RepeatedField text={"Discount (20%)"} />
      <View
        style={{
          height: 2,
          width: "100%",
          backgroundColor: "#EEEEEE",
        }}
      ></View>
      <RepeatedField text={"Total"} />
      <TouchableOpacity style={styles.checkout}>
        <Text style={{ color: "white", fontWeight: "900", fontSize: 20 }}>
          Checkout
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: "10%",
    gap: 4,
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold",
  },
  box: {
    height: 150,
    width: 150,
    // backgroundColor: "blue",
    borderRadius: 75,
  },
  checkout: {
    backgroundColor: "tomato",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Store;
