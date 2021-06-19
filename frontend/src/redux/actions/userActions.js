import * as actionTypes from "../constants/userConstant";
import { ORDER_LIST_RESET } from "../constants/orderConstants";
import axios from "axios";





export const Login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login/",
      { username: email, password: password },
      config
    );
    // console.log("userActions.js ----->",data);
    dispatch({
      type: actionTypes.USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: actionTypes.USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};







export const Logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({
    type: actionTypes.USER_LOGIN_LOGOUT,
  });
  dispatch({
    type: actionTypes.USER_DETAILS_RESET,
  })
  dispatch({
    type: actionTypes.USER_LIST_RESET,
  })
  dispatch({
    type : ORDER_LIST_RESET,
  })
};






export const Register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/register/",
      { name: name, email: email, password: password },
      config
    );
    // console.log("userActions.js ----->",data);
    dispatch({
      type: actionTypes.USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: actionTypes.USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: actionTypes.USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};







export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.USER_DETAILS_REQUEST,
    });

    const { userLogin } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userLogin.userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}/`,config);

    dispatch({
      type: actionTypes.USER_DETAILS_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: actionTypes.USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};








export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.USER_UPDATE_PROFILE_REQUEST,
    });

    const { userLogin } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userLogin.userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/users/profile/update/`,
    user,
    config);



    dispatch({
      type: actionTypes.USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: actionTypes.USER_LOGIN_SUCCESS,
      payload: data
  })

    localStorage.setItem("userInfo", JSON.stringify(data));

  } catch (error) {
    dispatch({
      type: actionTypes.USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};





export const listOfUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.USER_LIST_REQUEST,
    });

    const { userLogin } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userLogin.userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/`,
    config);

    dispatch({
      type: actionTypes.USER_LIST_SUCCESS,
      payload: data,
    });
  
  } catch (error) {
    dispatch({
      type: actionTypes.USER_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};