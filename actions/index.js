import {
  GET_ALL_PRODUCTS,
  PRODUCT_SEARCH,
  CHECK_AUTH,
  LOGOUT,
  GET_STORE_PRODUCT,
  UPDATE_PRODUCT,
  ADD_PRODUCT,
  ADD_TO_CART,
  DELETE_FROM_CART,
  CLEAR_CART,
  DISPLAY_PRODUCT,
  REFRESH_DISPLAY_PRODUCT,
  DISPLAY_STORE_PRODUCT,
} from "./types";
import { DOMAIN } from "../Api";
import fakeData from "../fakeData.json";
import * as SecureStore from "expo-secure-store";

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
    const stored_token = await SecureStore.getItemAsync("token");
    if (!stored_token) {
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
      payload: { auth: data.auth, username: data.username, token: data.token },
    });
  } catch (err) {
    return dispatch({
      type: CHECK_AUTH,
      payload: { auth: false, username: "Guest" },
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await SecureStore.deleteItemAsync("token");
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
    const token = await SecureStore.getItemAsync("token");
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

export const delete_from_cart = (value) => {
  return {
    type: DELETE_FROM_CART,
    payload: value,
  };
};

export const clear_cart = () => {
  return {
    type: CLEAR_CART,
  };
};

// For Product PAge

export const display_product = (value) => {
  return { type: DISPLAY_PRODUCT, payload: value };
};

// For Edit Screen
export const refresh_display_product = () => {
  return { type: REFRESH_DISPLAY_PRODUCT };
};

export const display_store_product = (value) => {
  return {
    type: DISPLAY_STORE_PRODUCT,
    payload: value,
  };
};
