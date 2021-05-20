import * as actionTypes from "../constants/userConstant";
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
      { username: email,password: password,},
      config
    );
    // console.log("userActions.js ----->",data);
    dispatch({
        type : actionTypes.USER_LOGIN_SUCCESS,
        payload : data
    })

    localStorage.setItem('userInfo',JSON.stringify(data))

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



export const Logout = ()=>(dispatch)=>{
    localStorage.removeItem('userInfo')
    dispatch({
        type : actionTypes.USER_LOGIN_LOGOUT,
    })

}
