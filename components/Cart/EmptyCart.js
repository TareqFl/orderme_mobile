import {
  StyleSheet,
  Text,
  View,
  NativeModules,
  LayoutAnimation,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "@rneui/themed";
import { usePathname } from "expo-router";

const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const EmptyCart = () => {
  const { width, height } = Dimensions.get("screen");
  const path = usePathname();

  //   Far Right
  const px1 = width / 2.7;

  //    middle
  const px2 = width / 5.5;

  //    far left
  const px3 = 4;

  //  far bottom
  const py1 = height / 2.7;

  //   far center
  const py2 = height / 5;

  //   far Top
  const py3 = 0;

  const [PosX, setPosX] = useState(px2);
  const [PosY, setPosY] = useState(py1);
  const [start, setStart] = useState(1);

  const logo_pos = [
    { x: px1, y: height / 5 },
    { x: px2, y: Platform.OS === "android" ? StatusBar.currentHeight : 40 },
    { x: px3, y: height / 5 },
    { x: px2, y: height / 2.7 },
  ];
  useEffect(() => {
    const repeat = setInterval(() => {
      LayoutAnimation.spring();
      if (start === logo_pos.length) {
        setStart(0);
      }
      setStart((prev) => prev + 1);
      setPosX((prev) => logo_pos[start - 1].x);
      setPosY((prev) => logo_pos[start - 1].y);
    }, 1500);

    return () => clearInterval(repeat);
  }, [start]);

  return (
    <View
      style={{
        flex: 1,
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          height: 100,
          width: 100,
          borderRadius: 50,
          left: PosX,
          top: PosY,
          position: "absolute",
          transform: [{ translateX: PosX }, { translateY: PosY }],
          overflow: "hidden",
        }}
      >
        <Image
          source={require("../../assets/logo.webp")}
          style={{ height: 100, width: 100 }}
        />
      </View>

      <Text>Your Cart is Empty</Text>
    </View>
  );
};

export default EmptyCart;

const styles = StyleSheet.create({});
