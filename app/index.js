import {
  StyleSheet,
  View,
  NativeModules,
  LayoutAnimation,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { check_auth, get_all_products } from "../actions";
import { useDispatch } from "react-redux";

const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const Splash = () => {
  const dispatch = useDispatch();
  const [animText, setAnimText] = useState({
    height: "100%",
    width: "100%",
    borderRadius: 0,
  });

  const [shdw, setshdw] = useState({
    elevation: 0,
    shadowColor: "",
    shadowOffset: {},
    shadowOpacity: 0,
    shadowRadius: 0,
  });

  const navigation = useRouter();

  useEffect(() => {
    dispatch(check_auth());
    dispatch(get_all_products());
    const timer = setTimeout(() => {
      LayoutAnimation.spring(() => {
        navigation.push("Home");
      });
      setshdw((prev) => ({
        elevation: 8,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      }));
      return setAnimText({
        height: 150,
        width: 150,
        borderRadius: 100,
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);
  return (
    <View style={{ ...styles.container, ...shdw }}>
      <Image
        source={require("../assets/logo.webp")}
        style={{ ...animText, backgroundColor: "white" }}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
