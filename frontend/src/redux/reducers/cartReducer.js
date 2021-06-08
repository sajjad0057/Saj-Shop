import * as actionTypes from "../constants/cartConstants"



export const cartReducer = (state = {cartItems:[],shippingAddress : {} },action) => {
    switch(action.type){
        case actionTypes.CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find((x)=>x.product_id === item.product_id)
            if(existItem){
                return {
                    ...state,
                    cartItems:state.cartItems.map((x)=>(
                        x.product_id === existItem.product_id ? item : x
                    ))
                }
            }else{
                return {
                    ...state,
                    cartItems : [...state.cartItems,item]
                }

            }
        case actionTypes.CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems : state.cartItems.filter(x=>x.product_id !== action.payload)
            }
        case actionTypes.CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress : action.payload
            }


        default:
            return state
    }
}