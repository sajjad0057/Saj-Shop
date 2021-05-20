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
        // console.log("sajjad",err.message,err.response,err.response.data.message);
        dispatch({
            type:actionTypes.PRODUCT_LIST_FAILED,
            payload : err.response && err.response.data.detail
            ? err.response.data.detail
            : err.message
        
        })
    }
}


export const productDetails = (id) =>async (dispatch)=>{

    try{
        dispatch({type:actionTypes.PRODUCT_DETAILS_REQUEST})
        const {data} = await axios.get(`/api/products/${id}`)
        dispatch({
            type : actionTypes.PRODUCT_DETAILS_SUCCESS,
            payload : data
        })

    }catch(err){
        dispatch({
            type:actionTypes.PRODUCT_DETAILS_FAILED,
            payload : err.response && err.response.data.detail
            ? err.response.data.detail
            : err.message
        
        })
    }
}



