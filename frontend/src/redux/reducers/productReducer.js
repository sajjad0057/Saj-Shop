import * as actionTypes from '../constants/productConstant'


export const productListReducer = (state={products:[]},action) => {
    switch(action.type){
        case actionTypes.PRODUCT_LIST_REQUEST:
            return {loading:true,products:[]}
        case actionTypes.PRODUCT_LIST_SUCCESS:
            return {loading:false,products:action.payload}
            
        case actionTypes.PRODUCT_LIST_FAILED:
            return {loading:false,products:action.payload}

        default:
            return state

    }

}