import Icon from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Tabs, useRouter } from "expo-router";
import {
  Platform,
  NativeModules,
  LayoutAnimation,
  View,
  TouchableOpacity,
  Text,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useState } from "react";

import CartBadge from "../../components/CartBadge/CartBadge";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions";

const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default () => {
  const dispatch = useDispatch();
  const { Auth } = useSelector((state) => state);
  const { auth } = Auth;
  const [allIcons, setAllIcons] = useState({
    home: 25,
    store: 25,
    cart: 25,
    auth_: 25,
    hc: "black",
    sc: "black",
    cc: "black",
    lc: "black",
  });
  const { home, store, cart, auth_, hc, sc, cc, lc } = allIcons;
  const navigation = useRouter();

  return (
    <Tabs
      sceneContainerStyle={{
        backgroundColor: "white",
      }}
      screenListeners={async ({ route }) => {
        const { name } = route;
        LayoutAnimation.spring();
        switch (name) {
          case "Home":
            return setAllIcons((prev) => ({
              home: 35,
              store: 23,
              cart: 23,
              auth_: 23,
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
              auth_: 23,
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
              auth_: 23,
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
              auth_: 35,
              hc: "black",
              sc: "black",
              cc: "black",
              lc: "tomato",
            }));

          default:
            break;
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
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Icon name="home" size={home} color={hc} />
                <Text style={{ color: hc, fontSize: 10 }}>Home</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ width: 40 }}
              onPress={() => {
                navigation.push("Store");
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                <Fontisto name="shopping-store" size={store} color={sc} />
                <Text style={{ color: sc, fontSize: 10 }}>Store</Text>
              </View>
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
                if (auth) {
                  return dispatch(logout());
                  // return navigation.push("Home");
                }
                return navigation.push("Login");
              }}
            >
              {auth ? (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <MaterialIcons name="logout" size={auth_} color={lc} />
                  <Text style={{ color: "tomato", fontSize: 10 }}>Logout</Text>
                </View>
              ) : (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <MaterialIcons name="login" size={auth_} color={lc} />
                  <Text style={{ color: lc, fontSize: 10 }}>Login</Text>
                </View>
              )}
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
