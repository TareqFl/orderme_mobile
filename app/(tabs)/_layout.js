import Icon from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import { Platform, Text } from "react-native";
export default () => {
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
        tabBarIcon: () => {
          return <Text>hello</Text>;
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return <Icon name="home" size={25} color={"black"} />;
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
          tabBarIcon: (focused) => {
            return <Fontisto name="shopping-store" size={25} color={"black"} />;
          },
        }}
      />

      <Tabs.Screen
        name="Cart"
        options={{
          headerShown: false,
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
          tabBarIcon: (focused) => {
            return (
              <MaterialIcons name="shopping-cart" size={25} color="black" />
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
            return <MaterialIcons name="login" size={25} color="black" />;
          },
        }}
      />
    </Tabs>
  );
};
