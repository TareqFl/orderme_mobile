import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../reducers";
import { Platform } from "react-native";

const StackLayout = () => {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Product"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Edit"
          options={{
            headerShown: Platform.OS === "ios" ? true : false,
            headerTitle: "",
          }}
        />
      </Stack>
    </Provider>
  );
};

export default StackLayout;
