import { StyleSheet, StatusBar, SafeAreaView } from "react-native";
import React from "react";
import SearchBar from "../../components/HomeScreen/SearchBar";
import ProductsCard from "../../components/HomeScreen/ProductsList";
const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} hidden={false} barStyle={"dark-content"} />
      <SearchBar />
      <ProductsCard />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});
