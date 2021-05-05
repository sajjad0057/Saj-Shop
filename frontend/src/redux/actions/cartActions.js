import * as actionTypes from "../constants/cartConstants"
import axios from 'axios'


//getState() function will show always current or updated state
//dispatch() function will send "action" to root for performing something.

export const addToCart = (id,qty) =>async (dispatch,getState) =>{  
    const {data} = await axios.get(`/api/products/${id}`)
    console.log("cartActions.js ----- >",data.countInStock);
    dispatch({
        type : actionTypes.CART_ADD_ITEM,
        payload : {
            product_id :data.id,
            name : data.name,
            image : data.image,
            price : data.price,
            countInStoke : data.countInStock,
            qty : qty
        }
    })


    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))

}