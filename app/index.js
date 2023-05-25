import {
  StyleSheet,
  Text,
  View,
  NativeModules,
  LayoutAnimation,
  Pressable,
  Image,
} from "react-native";
import React, { createRef, useEffect, useRef, useState } from "react";
import { Redirect, useRouter } from "expo-router";

const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const index = () => {
  const [animText, setAnimText] = useState({
    height: "100%",
    width: "100%",
    borderRadius: 0,
  });
  const navigation = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      LayoutAnimation.spring(() => navigation.push("Home"));
      return setAnimText({
        height: 200,
        width: 200,
        borderRadius: 100,
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);
  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.webp")} style={animText} />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
