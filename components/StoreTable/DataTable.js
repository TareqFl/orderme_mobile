import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import TableRows from "./TableRows";

const DataTable = ({ data }) => {
  const obj_keys = [
    {
      value: "id",
      keyStyle: {
        width: 24,
      },
    },
    {
      value: "title",
      keyStyle: {
        width: 90,
      },
    },
    {
      value: "brand",
      keyStyle: {
        width: 75,
      },
    },
    {
      value: "price",
      keyStyle: {
        width: 75,
      },
    },
    {
      value: "category",
      keyStyle: {
        width: 95,
      },
    },
    {
      value: "description",
      keyStyle: {
        width: 120,
      },
    },

    {
      value: "thumbnail",
      keyStyle: {
        width: 120,
      },
    },
    {
      value: "images",
      keyStyle: {
        width: 80,
      },
    },
    {
      value: "Action",
      keyStyle: {
        width: 120,
      },
    },
  ];

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: 800,
        }}
      >
        {obj_keys.map((ky, indx) => {
          const { value, keyStyle } = ky;
          return (
            <View key={indx} style={{ ...keyStyle, ...styles.key }}>
              <Text style={styles.title}>{value}</Text>
            </View>
          );
        })}
      </View>
      <View
        style={{
          width: 800,
        }}
      >
        <FlatList
          key={({ item, index }) => index}
          data={data ? data : []}
          renderItem={({ item }) => <TableRows value={item} />}
        />
      </View>
    </View>
  );
};

export default DataTable;

const styles = StyleSheet.create({
  container: {
    height: 200,
  },

  key: {
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 4,
  },
  title: {
    fontSize: 18,
  },
});
