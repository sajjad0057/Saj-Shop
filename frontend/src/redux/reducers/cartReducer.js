import * as actionTypes from "../constants/cartConstants"



export const cartReducer = (state = {cartItems:[]},action) => {
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
        default:
            return state
    }
}