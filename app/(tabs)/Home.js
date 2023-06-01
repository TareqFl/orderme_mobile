import { StyleSheet, StatusBar, SafeAreaView, Alert } from "react-native";
import React, { useEffect } from "react";
import SearchBar from "../../components/HomeScreen/SearchBar";
import ProductsCard from "../../components/HomeScreen/ProductsList";

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <SearchBar />
      <ProductsCard />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: StatusBar.currentHeight,
  },
});
