import {
  GET_ALL_PRODUCTS,
  PRODUCT_SEARCH,
  CHECK_AUTH,
  LOGIN,
  LOGOUT,
  REGISTER,
  GET_STORE_PRODUCT,
  UPDATE_PRODUCT,
  ADD_PRODUCT,
  ADD_TO_CART,
  DELETE_FROM_CART,
} from "./types";
import { DOMAIN } from "@env";
import fakeData from "../fakeData.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const get_all_products = () => async (dispatch) => {
  try {
    const response = await fetch(DOMAIN + "/all_products");
    const data = await response.json();
    return dispatch({
      type: GET_ALL_PRODUCTS,
      payload: [...data.products, ...fakeData],
    });
  } catch (error) {
    return dispatch({
      type: GET_ALL_PRODUCTS,
      payload: fakeData,
    });
  }
};

export const product_search = (text, value) => {
  const products_found = value.filter((product) =>
    product.title.toLowerCase().includes(text.toLowerCase())
  );

  return {
    type: PRODUCT_SEARCH,
    payload: products_found,
  };
};

export const check_auth = () => async (dispatch) => {
  try {
    const stored_token = await AsyncStorage.getItem("token");
    if (!token) {
      return dispatch({
        type: CHECK_AUTH,
        payload: { auth: false, username: "Guest" },
      });
    }

    const response = await fetch(DOMAIN + "/auth", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${stored_token}`,
      },
    });

    const data = await response.json();
    return dispatch({
      type: CHECK_AUTH,
      payload: data,
    });
  } catch (err) {
    return dispatch({
      type: CHECK_AUTH,
      payload: { auth: false, username: "Guest" },
    });
  }
};

export const login = (value) => async (dispatch) => {
  try {
    const response = await fetch(DOMAIN + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });

    const data = await response.json();
    const { token, auth, username } = data;
    await AsyncStorage.setItem("token", token);
    return dispatch({
      type: LOGIN,
      payload: { auth, username },
    });
  } catch (error) {
    return dispatch({
      type: LOGIN,
      payload: error.message,
    });
  }
};

export const register = (value) => async (dispatch) => {
  try {
    const response = await fetch(DOMAIN + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });

    const data = await response.json();
    const { token, auth, username } = data;
    await AsyncStorage.setItem("token", token);
    return dispatch({
      type: REGISTER,
      payload: { auth, username },
    });
  } catch (error) {
    return dispatch({
      type: REGISTER,
      payload: error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await AsyncStorage.removeItem("token");
    return dispatch({
      type: LOGOUT,
      payload: { auth: false, username: "Guest" },
    });
  } catch (error) {
    return;
  }
};

export const get_store_products = () => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await fetch(DOMAIN + "/get_product", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return dispatch({
      type: GET_STORE_PRODUCT,
      payload: data.products,
    });
  } catch (error) {
    return;
  }
};

export const add_Product = (value) => async (dispatch) => {
  try {
    const response = await fetch(DOMAIN + "/add_product", {
      method: "POST",
      body: value,
    });

    const data = await response.json();
    return dispatch({
      type: ADD_PRODUCT,
    });
  } catch (error) {
    return;
  }
};

export const update_Product = (value) => async (dispatch) => {
  try {
    const response = await fetch(DOMAIN + "/update_product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });

    const data = await response.json();
    return dispatch({
      type: UPDATE_PRODUCT,
    });
  } catch (error) {
    return;
  }
};

export const add_to_cart = (value) => {
  return {
    type: ADD_TO_CART,
    payload: value,
  };
};
