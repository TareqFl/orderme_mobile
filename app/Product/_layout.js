import { Stack, useRouter } from "expo-router";
import { Platform, Pressable, SafeAreaView, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
const StackLayout = () => {
  const navigation = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="BuyPage"
        options={{
          headerShown: Platform.OS === "ios" ? true : false,
        }}
      />
      <Stack.Screen
        name="[productIndex]"
        options={{
          headerShown: Platform.OS === "ios" ? true : false,
          header:
            Platform.OS === "ios" &&
            (() => {
              return (
                <SafeAreaView>
                  <Pressable
                    onPress={() => navigation.back()}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Ionicons name="chevron-back" size={35} color="blue" />
                    <Text style={{ fontSize: 18, color: "blue" }}>Back</Text>
                  </Pressable>
                </SafeAreaView>
              );
            }),
        }}
      />
    </Stack>
  );
};

export default StackLayout;
