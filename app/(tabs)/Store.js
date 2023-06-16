import {
  Platform,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";

import DataTable from "../../components/StoreTable/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { get_store_products } from "../../actions";
import DisplayProduct from "../../components/StorePage/DisplayProduct";

const Store = () => {
  const navigation = useRouter();
  const dispatch = useDispatch();
  const { auth, token } = useSelector((state) => state.Auth);
  const Display_Store_Product = useSelector(
    (state) => state.Display_Store_Product
  );
  const Store_Products = useSelector((state) => state.Store_Products);

  useEffect(() => {
    dispatch(get_store_products());
  }, [Display_Store_Product]);

  if (!auth) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Youre not Logged in</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          minHeight: 200,
          maxHeight: 400,
          paddingHorizontal: Platform.OS === "ios" ? 16 : 0,
          alignItems: "center",
        }}
      >
        <View style={{ flex: 1 }}>
          {Store_Products ? (
            <DataTable />
          ) : (
            <View
              style={{
                height: Platform.OS === "android" ? 150 : 200,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator />
            </View>
          )}
        </View>
      </View>
      <ScrollView style={styles.section}>
        <TouchableOpacity
          style={{
            backgroundColor: "tomato",
            width: 130,
            paddingVertical: 10,
            paddingHorizontal: 6,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
            marginBottom: 10,
          }}
          onPress={() => {
            navigation.push("Edit/NewProduct");
          }}
        >
          <Text style={{ color: "#ffffff", fontWeight: "900" }}>
            Add a new item
          </Text>
        </TouchableOpacity>
        {Display_Store_Product === null ? (
          <Text style={{ textAlign: "center" }}>
            Click on item Action button to display here
          </Text>
        ) : (
          <DisplayProduct />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Store;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 16,
    justifyContent: "flex-start",
    alignContent: "center",
  },
  section: {
    paddingHorizontal: 16,
  },
});
