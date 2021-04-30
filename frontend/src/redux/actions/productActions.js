import * as actionTypes from '../constants/productConstant'
import axios from 'axios'



export const listProducts = () =>async (dispatch)=>{
    try{
        dispatch({type:actionTypes.PRODUCT_LIST_REQUEST})
        const {data} = await axios.get('/api/products')
        dispatch({
            type : actionTypes.PRODUCT_LIST_SUCCESS,
            payload : data
        })

    }catch(err){
        dispatch({
            type:actionTypes.PRODUCT_LIST_FAILED,
            payload : err.response && err.response.data.message
            ? err.response.data.message
            : err.message
        
        })
    }
}