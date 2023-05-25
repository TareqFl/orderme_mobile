import Icon from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Tabs, useRouter } from "expo-router";
import { Platform, Text, NativeModules, LayoutAnimation } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import CartBadge from "../../components/CartBadge/CartBadge";

const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default () => {
  const [allIcons, setAllIcons] = useState({
    home: 25,
    store: 25,
    cart: 25,
    auth: 25,
  });
  const { home, store, cart, auth } = allIcons;
  const navigation = useRouter();
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          justifyContent: "space-between",
          alignItems: "center",
          padding: Platform.OS === "android" ? 5 : 2,
          height: Platform.OS === "android" ? 75 : 85,
          bottom: Platform.OS === "android" ? 15 : 0,
          width: Platform.OS === "android" ? "90%" : "100%",
          alignSelf: "center",
          borderTopLeftRadius: Platform.OS === "android" ? 20 : 50,
          borderTopRightRadius: Platform.OS === "android" ? 20 : 50,
          borderBottomLeftRadius: Platform.OS === "android" ? 20 : 0,
          borderBottomRightRadius: Platform.OS === "android" ? 20 : 0,
          elevation: 4,
          shadowColor: "black",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 4,
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  LayoutAnimation.spring();
                  setAllIcons((prev) => ({
                    home: 35,
                    store: 25,
                    cart: 25,
                    auth: 25,
                  }));
                  return navigation.push("Home");
                }}
              >
                <Icon name="home" size={home} color={"black"} />
              </TouchableOpacity>
            );
          },
          tabBarLabel: ({ position }) => {
            return (
              <Text
                style={{
                  top: Platform.OS === "ios" ? 10 : -5,
                }}
              >
                Home
              </Text>
            );
          },
          tabBarLabelStyle: {
            fontWeight: "bold",
            fontSize: 10,
          },
        }}
      />
      <Tabs.Screen
        name="Store"
        options={{
          headerShown: false,
          tabBarLabel: ({ position }) => {
            return (
              <Text
                style={{
                  top: Platform.OS === "ios" ? 10 : -5,
                }}
              >
                Store
              </Text>
            );
          },
          tabBarIcon: ({ focused }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  LayoutAnimation.spring();
                  setAllIcons((prev) => ({
                    home: 25,
                    store: 30,
                    cart: 25,
                    auth: 25,
                  }));
                  navigation.push("Store");
                }}
              >
                <Fontisto name="shopping-store" size={store} color={"black"} />
              </TouchableOpacity>
            );
          },
        }}
      />

      <Tabs.Screen
        name="Cart"
        options={{
          headerShown: false,
          tabBarBadgeStyle: {
            color: "white",
            backgroundColor: "red",
          },
          tabBarLabel: ({ position }) => {
            return (
              <Text
                style={{
                  top: Platform.OS === "ios" ? 10 : -5,
                }}
              >
                Cart
              </Text>
            );
          },
          tabBarIcon: ({ focused }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  LayoutAnimation.spring();
                  setAllIcons((prev) => ({
                    home: 25,
                    store: 25,
                    cart: 35,
                    auth: 25,
                  }));
                  navigation.push("Cart");
                }}
              >
                <CartBadge cart={cart} />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Tabs.Screen
        name="Login"
        options={{
          headerShown: false,
          tabBarLabel: ({ position }) => {
            return (
              <Text
                style={{
                  top: Platform.OS === "ios" ? 10 : -5,
                }}
              >
                Login
              </Text>
            );
          },
          tabBarIcon: ({ focused }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  LayoutAnimation.spring();
                  setAllIcons((prev) => ({
                    home: 25,
                    store: 25,
                    cart: 25,
                    auth: 35,
                  }));
                  navigation.push("Login");
                }}
              >
                <MaterialIcons name="login" size={auth} color="black" />
              </TouchableOpacity>
            );
          },
        }}
      />
    </Tabs>
  );
};
