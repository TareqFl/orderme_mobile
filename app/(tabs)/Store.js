import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  View,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import DataTable from "../../components/StoreTable/DataTable";
import { TouchableOpacity } from "react-native-gesture-handler";
// "orientation": "portrait",

const Store = () => {
  const [data, setData] = useState([]);
  const [window_width, setWindow] = useState(Dimensions.get("window").width);
  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=10")
      .then((res) => res.json())
      .then((v) => setData(v.products))
      .catch((err) => console.warn(err.message));
  }, []);

  useEffect(() => {
    const onOrientationChange = () => {
      const orientation = ScreenOrientation.getOrientationAsync();
      console.log("Current orientation:", orientation);
      const { width } = Dimensions.get("window");
      setWindow((prev) => width);
      // Perform actions based on the orientation change
    };

    const subscription =
      ScreenOrientation.addOrientationChangeListener(onOrientationChange);

    return () => {
      subscription.remove(); // Clean up the listener when component unmounts
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {window_width >= 800 ? (
        <DataTable data={data} />
      ) : (
        <View
          style={{
            window_width,
            height: 300,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Please Rotate Screen To View Data!</Text>
        </View>
      )}
      <ScrollView style={{ flex: 1, marginTop: 50 }}>
        <View>
          <TouchableOpacity>
            <Text>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Clear</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Store;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 16,
    paddingHorizontal: Platform.OS === "android" ? 16 : 0,
  },
});
