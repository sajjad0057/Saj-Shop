import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailReducer,
} from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  userDetailReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userListReducer,
} from "./reducers/userReducer";
import { 
  orderReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListReducer,
} from "./reducers/orderReducer";

const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList : userListReducer,
  orderCreate : orderReducer,
  orderDetails : orderDetailsReducer,
  orderPay : orderPayReducer,
  orderList : orderListReducer,
  
});

const cartItemFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const initState = {
  cart: {
    cartItems: cartItemFromStorage, // here, In global state Contain, cartReducer state , cart  property "cartItems" is  refill/updated by browser storage.
    shippingAddress: shippingAddressFromStorage,
  },

  userLogin: {
    userInfo: userInfoFromStorage, // here, In global state Contain, useReducer state , userLogin  property "userInfo" is  refill/updated by browser storage.
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
