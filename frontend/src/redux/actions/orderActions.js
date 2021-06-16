import * as actionTypes from "../constants/orderConstants";
import { CART_CLEAR_ITEMS } from "../constants/cartConstants";
import axios from "axios";


export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.ORDER_CREATE_REQUEST,
    });

    const { userLogin } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userLogin.userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/orders/add/`, order, config);

    // console.log("createOrder _------->", data);
    dispatch({
      type: actionTypes.ORDER_CREATE_SUCCESS,
      payload: data,
    });

    dispatch({
      type : CART_CLEAR_ITEMS,
      payload: data,
    })

    localStorage.removeItem("cartItems")


  } catch (error) {
    //console.log("createOrder _------->", error.response);
    dispatch({
      type: actionTypes.ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.ORDER_DETAILS_REQUEST,
    });

    const { userLogin } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userLogin.userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}/`, config);

    dispatch({
      type: actionTypes.ORDER_DETAILS_SUCCESS,
      payload: data,
    });



  } catch (error) {
    dispatch({
      type: actionTypes.ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
