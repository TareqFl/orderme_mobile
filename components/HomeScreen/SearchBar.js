import {
  Image,
  StyleSheet,
  TextInput,
  View,
  NativeModules,
  LayoutAnimation,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { product_search } from "../../actions";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";

const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const SearchBar = () => {
  const dispatch = useDispatch();
  const { Products } = useSelector((state) => state);
  // handler
  function handleSearch(text) {
    dispatch(product_search(text, Products));
  }

  const [styling, setStyling] = useState({
    width: "0%",
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
  });
  const {
    width,
    elevation,
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = styling;
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.webp")} style={styles.logo} />
      <View
        style={{
          ...styles.searchContainer,
          elevation,
          shadowColor,
          shadowOffset,
          shadowOpacity,
          shadowRadius,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            LayoutAnimation.spring();
            if (width === "60%") {
              return setStyling((prev) => ({
                width: "0%",
                elevation: 2,
                shadowColor: "black",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.25,
                shadowRadius: 2,
              }));
            }
            return setStyling((prev) => ({
              width: "60%",
              elevation: 4,
              shadowColor: "black",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
            }));
          }}
        >
          <Ionicons name="search-outline" color="black" size={28} />
        </TouchableOpacity>
        <TextInput
          style={{ width }}
          placeholder="Search..."
          placeholderTextColor="black"
          onChangeText={handleSearch}
        />
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 75,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
  },

  logo: {
    height: "100%",
    width: 75,
    borderRadius: 50,
    marginLeft: 16,
  },
  searchContainer: {
    borderRadius: 24,
    marginRight: 32,
    padding: 12,
    fontSize: 12,
    backgroundColor: "white",
    borderWidth: 0,
    flexDirection: "row",
    alignItems: "center",
  },
});
