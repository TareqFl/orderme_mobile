import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../reducers";
import { Platform } from "react-native";
import { StripeProvider } from "@stripe/stripe-react-native";
import { STRIPE_PK } from "../Api";
const StackLayout = () => {
  return (
    <Provider store={store}>
      <StripeProvider publishableKey={STRIPE_PK}>
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
              headerShown: Platform.OS === "ios" ? true : false,
              headerTitle: "",
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
      </StripeProvider>
    </Provider>
  );
};

export default StackLayout;
