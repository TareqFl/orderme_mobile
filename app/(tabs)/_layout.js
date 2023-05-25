import Icon from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Tabs, useRouter } from "expo-router";
import {
  Platform,
  Text,
  NativeModules,
  LayoutAnimation,
  View,
} from "react-native";

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
    hc: "black",
    sc: "black",
    cc: "black",
    lc: "black",
  });
  const { home, store, cart, auth, hc, sc, cc, lc } = allIcons;
  const navigation = useRouter();
  return (
    <Tabs
      sceneContainerStyle={{
        backgroundColor: "white",
      }}
      screenListeners={({ route }) => {
        const { name } = route;
        LayoutAnimation.spring();

        switch (name) {
          case "Home":
            return setAllIcons((prev) => ({
              home: 35,
              store: 23,
              cart: 23,
              auth: 23,
              hc: "tomato",
              sc: "black",
              cc: "black",
              lc: "black",
            }));
          case "Store":
            return setAllIcons((prev) => ({
              home: 23,
              store: 35,
              cart: 23,
              auth: 23,
              hc: "black",
              sc: "tomato",
              cc: "black",
              lc: "black",
            }));
          case "Cart":
            return setAllIcons((prev) => ({
              home: 23,
              store: 23,
              cart: 35,
              auth: 23,
              hc: "black",
              sc: "black",
              cc: "tomato",
              lc: "black",
            }));
          case "Login":
            return setAllIcons((prev) => ({
              home: 23,
              store: 23,
              cart: 23,
              auth: 35,
              hc: "black",
              sc: "black",
              cc: "black",
              lc: "tomato",
            }));

          default:
            return;
        }
      }}
      tabBar={() => {
        return (
          <View
            style={{
              backgroundColor: "white",
              flexDirection: "row",
              justifyContent: "space-between",
              alignSelf: "center",
              alignItems: "center",
              paddingHorizontal: 32,
              height: Platform.OS === "android" ? 75 : 85,
              bottom: Platform.OS === "android" ? 15 : 0,
              width: Platform.OS === "android" ? "90%" : "100%",
              borderTopLeftRadius: Platform.OS === "android" ? 20 : 50,
              borderTopRightRadius: Platform.OS === "android" ? 20 : 50,
              borderBottomLeftRadius: Platform.OS === "android" ? 20 : 0,
              borderBottomRightRadius: Platform.OS === "android" ? 20 : 0,
              elevation: 4,
              shadowColor: "black",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 4,
            }}
          >
            <TouchableOpacity
              style={{ width: 40 }}
              onPress={() => {
                return navigation.push("Home");
              }}
            >
              <Icon name="home" size={home} color={hc} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ width: 40 }}
              onPress={() => {
                navigation.push("Store");
              }}
            >
              <Fontisto name="shopping-store" size={store} color={sc} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ width: 40 }}
              onPress={() => {
                navigation.push("Cart");
              }}
            >
              <CartBadge cart={cart} cc={cc} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ width: 40 }}
              onPress={() => {
                navigation.push("Login");
              }}
            >
              <MaterialIcons name="login" size={auth} color={lc} />
            </TouchableOpacity>
          </View>
        );
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Store"
        options={{
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="Cart"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Login"
        options={{
          headerShown: false,
        }}
      />
    </Tabs>
  );
};
