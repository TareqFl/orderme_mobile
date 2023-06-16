import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { DOMAIN } from "../../Api";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { check_auth } from "../../actions";
const Login = () => {
  const dispatch = useDispatch();
  const navigation = useRouter();

  const [reg, setReg] = useState(false);
  const [fact, setFact] = useState(true);
  const [entries, setEntries] = useState({
    username: "",
    password: "",
  });
  const { username, password } = entries;

  async function handleSubmit() {
    if (username === "") {
      return Alert.alert("Forgot Username");
    }
    if (password === "") {
      return Alert.alert("Forgot Password");
    }

    try {
      const response = await fetch(DOMAIN + (reg ? "/register" : "/login"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entries),
      });
      const data = await response.json();
      if (response.status !== 200) {
        return Alert.alert(data.message);
      }

      const { message, username, token } = data;

      await SecureStore.setItemAsync("token", token);

      setEntries((prev) => ({ username: "", password: "" }));
      dispatch(check_auth());

      return navigation.push("Home");
    } catch (error) {
      console.log(error.message);
      return Alert.alert(
        "Something went went wrong",
        "please try agian in later"
      );
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.text}>
          <TouchableOpacity onPress={() => setReg(!reg)}>
            <Text>Click here to {reg ? "Login" : "Register"}</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.Input}
          placeholder="Username"
          placeholderTextColor="gray"
          value={username}
          onChangeText={(e) => setEntries((prev) => ({ ...prev, username: e }))}
          autoCapitalize="none"
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: 12,
            backgroundColor: "white",
            elevation: 4,
            shadowColor: "gray",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            paddingRight: 16,
          }}
        >
          <TextInput
            style={styles.password}
            placeholder="Password"
            placeholderTextColor="gray"
            secureTextEntry={fact}
            autoCapitalize="none"
            value={password}
            onChangeText={(e) =>
              setEntries((prev) => ({ ...prev, password: e }))
            }
          />
          <Pressable onPress={() => setFact(!fact)}>
            {fact ? (
              <MaterialIcons name="visibility-off" color="gray" size={24} />
            ) : (
              <MaterialIcons name="visibility" color="gray" size={24} />
            )}
          </Pressable>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={{ fontWeight: "900", color: "white", fontSize: 16 }}>
            {reg ? "Register" : "Login"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    height: "50%",
    width: "75%",
    justifyContent: "space-between",
  },
  text: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#fc6b68",
    width: "100%",
    paddingVertical: 14,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  Input: {
    backgroundColor: "white",
    height: 76,
    width: "100%",
    borderRadius: 12,
    elevation: 4,
    padding: 8,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  password: {
    height: 76,
    width: "90%",
    borderRadius: 12,
    padding: 8,
  },
});
