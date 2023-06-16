import {
  StyleSheet,
  View,
  NativeModules,
  LayoutAnimation,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "expo-router";
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

  const navigation = useRouter();
  const path = usePathname();
  useEffect(() => {
    const handleSplash = () => {
      dispatch(check_auth());
      dispatch(get_all_products());
      if (path === "/") {
        LayoutAnimation.spring(() => {
          navigation.push("Home");
        });
        return setAnimText({
          height: 150,
          width: 150,
          borderRadius: 100,
        });
      }
      return setAnimText({
        height: "100%",
        width: "100%",
        borderRadius: 0,
      });
    };

    const timer = setTimeout(() => handleSplash(), 100);

    return () => clearTimeout(timer);
  }, [path]);
  return (
    <View style={{ ...styles.container }}>
      <View
        style={{
          ...animText,
          elevation: 4,
          shadowColor: "black",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 4,
          backgroundColor: "white",
        }}
      >
        <Image
          source={require("../assets/logo.webp")}
          style={{
            ...animText,
          }}
          resizeMode="stretch"
        />
      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});
