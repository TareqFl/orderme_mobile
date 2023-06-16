import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { FlashList } from "@shopify/flash-list";
const Comments = () => {
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("https://dummyjson.com/posts?limit=7")
      .then((response) => response.json())
      .then((data) => setComments(data.posts))
      .catch((err) => alert(err.message));

    fetch("https://dummyjson.com/users?limit=100")
      .then((response) => response.json())
      .then((data) => setUsers(data.users))
      .catch((err) => alert(err.message));
  }, []);

  return (
    <View>
      {comments.map((comment, index) => {
        const user = users?.find((usr) => usr.id === comment.userId);
        if (!user) {
          return <></>;
        }
        return (
          <View key={index} style={styles.CommentsContainer}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
                marginVertical: 4,
              }}
            >
              <Image
                source={{ uri: user.image ? user.image : "" }}
                style={styles.image}
              />
              <Text>
                {user.firstName} {user.lastName}
              </Text>
              {[1, 2, 3, 4, 5].map((nmbr, idx) => (
                <MaterialIcons key={idx} name="stars" color="orange" />
              ))}
            </View>

            <Text>{comment.body}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default Comments;

const styles = StyleSheet.create({
  CommentsContainer: {
    width: "100%",
  },
  image: {
    width: 32,
    height: 32,
  },
  commentSection: {},
});
