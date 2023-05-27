import { Stack } from "expo-router";
import { Platform } from "react-native";

const Edit = () => {
  return (
    <Stack>
      <Stack.Screen
        name="NewProduct"
        options={{
          headerShown: Platform.OS === "ios" ? true : false,
          headerTitle: "New Product",
        }}
      />
      <Stack.Screen
        name="EditProduct"
        options={{
          headerShown: Platform.OS === "ios" ? true : false,
          headerTitle: "Edit Product",
        }}
      />
    </Stack>
  );
};

export default Edit;
