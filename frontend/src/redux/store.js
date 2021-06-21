import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productTopRatedReducer,
} from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  userDetailReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userStatusUpdateReducer,
} from "./reducers/userReducer";
import { 
  orderReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListReducer,
  adminOrderListReducer,
  orderDeliverReducer,

} from "./reducers/orderReducer";

const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  productDelete : productDeleteReducer,
  productCreate : productCreateReducer,
  productUpdate : productUpdateReducer,
  productReviewCreate : productReviewCreateReducer,
  topProducts : productTopRatedReducer,
  cart: cartReducer,

  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userStatusUpdate : userStatusUpdateReducer,
  userList : userListReducer,
  userDelete : userDeleteReducer,

  orderCreate : orderReducer,
  orderDetails : orderDetailsReducer,
  orderPay : orderPayReducer,
  orderDeliver : orderDeliverReducer,
  orderList : orderListReducer,
  adminOrderList : adminOrderListReducer,
  
  
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
