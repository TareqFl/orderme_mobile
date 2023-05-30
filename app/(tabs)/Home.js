import { StyleSheet, StatusBar, SafeAreaView } from "react-native";
import React from "react";
import SearchBar from "../../components/HomeScreen/SearchBar";
import ProductsCard from "../../components/HomeScreen/ProductsList";
import { useSelector } from "react-redux";

const Home = () => {
  const { Auth } = useSelector((state) => state);

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
