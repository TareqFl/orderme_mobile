import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { CardField, useStripe } from "@stripe/stripe-react-native";
import { DOMAIN } from "@env";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { clear_cart } from "../../actions";

const BuyPage = () => {
  const navigation = useRouter();
  const dispatch = useDispatch();
  const { confirmPayment } = useStripe();
  const { Cart } = useSelector((state) => state);

  const [CartQuantity, setCartQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentError, setPaymentError] = useState("");
  const [paymentMethodId, setPaymentMethodId] = useState("");

  async function handlePayment() {
    try {
      const response = await fetch(DOMAIN + "/charge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: 1000 }),
      });

      const { clientSecret } = await response.json();

      // Collect card details and confirm the payment
      const cardDetails = await confirmPayment(clientSecret, {
        type: "Card",
        paymentMethodType: "Card",
      });

      if (cardDetails.error) {
        Alert.alert(cardDetails.error.message);
        console.log(cardDetails.error);
        return setPaymentError(cardDetails.error);
      } else if (cardDetails.paymentMethodId) {
        console.log(cardDetails.paymentIntent);
        return setPaymentMethodId(cardDetails.paymentMethodId);
      }
      Alert.alert("Success");
      dispatch(clear_cart());
      return navigation.push("Home");
    } catch (error) {
      return Alert.alert(("Its not you its Us", error.message));
    }
  }

  useEffect(() => {
    let total_Q = 0;
    let total_price = 0;
    Cart?.forEach((item) => {
      total_Q = total_Q + item.quantity;
      total_price = total_price + item.price;
    });

    setCartQuantity(total_Q);
    setTotalPrice(total_price);
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Text
        style={{
          fontSize: 20,
          fontWeight: "900",
          textShadowOffset: { width: 1, height: 1 },
          textShadowColor: "gray",
          textShadowRadius: 0.25,
          color: "black",
          textAlign: "center",
        }}
      >
        Complet your Payment
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "900",
            textShadowOffset: { width: 1, height: 1 },
            textShadowColor: "gray",
            textShadowRadius: 0.25,
            color: "black",
            textAlign: "center",
          }}
        >
          Total Items
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "900",
            textShadowOffset: { width: 1, height: 1 },
            textShadowColor: "gray",
            textShadowRadius: 0.25,
            color: "black",
            textAlign: "center",
          }}
        >
          {CartQuantity}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "900",
            textShadowOffset: { width: 1, height: 1 },
            textShadowColor: "gray",
            textShadowRadius: 0.25,
            color: "black",
            textAlign: "center",
          }}
        >
          Total
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "900",
            textShadowOffset: { width: 1, height: 1 },
            textShadowColor: "gray",
            textShadowRadius: 0.25,
            color: "black",
            textAlign: "center",
          }}
        >
          ${totalPrice}
        </Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="gray"
      />
      <TextInput
        style={styles.input}
        placeholder="Name on card"
        placeholderTextColor="gray"
      />
      <View
        style={{
          ...styles.input,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CardField
          postalCodeEnabled={true}
          placeholders={{
            number: "4242 4242 4242 4242",
          }}
          cardStyle={{
            backgroundColor: "#FFFFFF",
            textColor: "#000000",
          }}
          style={{
            width: "100%",
            height: 50,
            marginVertical: 30,
          }}
          // onCardChange={(cardDetails) => {
          //   console.log("cardDetails", cardDetails);
          // }}
          // onFocus={(focusedField) => {
          //   console.log("focusField", focusedField);
          // }}
        />
      </View>

      <TouchableOpacity style={styles.pay} onPress={handlePayment}>
        <Text
          style={{
            textAlign: "center",
            fontWeight: "900",
            color: "white",
            fontSize: 20,
          }}
        >
          Pay
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BuyPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7fafc",
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 16,
    gap: 32,
  },
  input: {
    width: "100%",
    height: 75,
    backgroundColor: "white",

    elevation: 2,
    shadowColor: "black",
    shadowOffset: { height: 1, width: 0 },
    shadowRadius: 1,
    shadowOpacity: 0.25,
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  pay: {
    height: 50,
    width: "100%",
    backgroundColor: "tomato",
    justifyContent: "center",
    marginTop: Platform.OS === "ios" ? 16 : 0,
    elevation: 8,
    shadowColor: "black",
    shadowOffset: { height: 4, width: 0 },
    shadowRadius: 1,
    shadowOpacity: 0.25,
    borderRadius: 12,
  },
});
